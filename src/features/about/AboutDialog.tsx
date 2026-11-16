import { type ReactNode, useEffect, useId, useRef } from "react";
import { Trans, useTranslation } from "react-i18next";
import { Icon } from "@/ui/Icon";
import { RichText } from "@/ui/RichText";
import { ISSUES_URL, LICENSE_URL, UPSTREAM_URL, isOutside } from "./about-links";
import styles from "./AboutDialog.module.css";

/**
 * The top bar's "About" button and the modal it opens: what the guide is and is not, and that this
 * site is an independent build of the open-source original, not the original author's own site. A native <dialog>: focus is trapped, Escape closes, focus returns to the
 * button, and a click on the dimmed page around it closes it too.
 */
export function AboutDialog() {
  const { t } = useTranslation();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const open = () => dialog.current?.showModal();
  const close = () => dialog.current?.close();

  // A click on the dimmed page around the box targets the dialog itself, outside its box.
  useEffect(() => {
    const box = dialog.current;
    if (!box) return;
    const onClick = (e: MouseEvent) => {
      if (e.target === box && isOutside(box.getBoundingClientRect(), e.clientX, e.clientY)) {
        box.close();
      }
    };
    box.addEventListener("click", onClick);
    return () => box.removeEventListener("click", onClick);
  }, []);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        aria-haspopup="dialog"
        aria-label={t("about.open")}
        onClick={open}
      >
        <Icon name="info" size={17} />
        <span className={styles.buttonLabel}>{t("about.button")}</span>
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-tagline`}
      >
        <div className={styles.head}>
          <h2 id={`${id}-title`} className={styles.title}>
            {t("about.title")}
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label={t("about.close")}
            onClick={close}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <p id={`${id}-tagline`} className={styles.tagline}>
          {t("about.tagline")}
        </p>
        <div className={styles.body}>
          <p>
            <RichText text={t("about.intro")} />
          </p>
          <p>{t("about.disclaimer")}</p>
          <p>
            <Trans
              t={t}
              i18nKey="about.feedback"
              components={{
                issues: <ExternalLink href={ISSUES_URL} />,
              }}
            />
          </p>
        </div>
        <hr className={styles.rule} />
        <p className={styles.made}>
          <Trans
            t={t}
            i18nKey="about.basedOn"
            components={{
              b: <b />,
              upstream: <ExternalLink href={UPSTREAM_URL} />,
              license: <ExternalLink href={LICENSE_URL} />,
            }}
          />
        </p>
      </dialog>
    </>
  );
}

/** A link inside a translated sentence; <Trans> fills in its words. */
function ExternalLink({ href, children }: { href: string; children?: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}
