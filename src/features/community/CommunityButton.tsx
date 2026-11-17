import { useEffect, useId, useRef } from "react";
import { useTranslation } from "react-i18next";
import { isOutside } from "@/features/about/about-links";
import { Icon } from "@/ui/Icon";
import qrSrc from "./wechat-group-qr.png";
import styles from "./CommunityButton.module.css";

/**
 * A chat button that stays at the bottom right of every page and opens the WeChat group's QR code.
 * A native <dialog> like the About one: focus is trapped, Escape closes, focus returns to the
 * button, and a click on the dimmed page around it closes it too.
 */
export function CommunityButton() {
  const { t } = useTranslation();
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);

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
        aria-label={t("community.open")}
        onClick={() => dialog.current?.showModal()}
      >
        <Icon name="chat" size={20} />
        <span className={styles.label}>{t("community.button")}</span>
      </button>
      <dialog
        ref={dialog}
        className={styles.dialog}
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-lead`}
      >
        <div className={styles.head}>
          <h2 id={`${id}-title`} className={styles.title}>
            {t("community.title")}
          </h2>
          <button
            type="button"
            className={styles.close}
            aria-label={t("community.close")}
            onClick={() => dialog.current?.close()}
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <p id={`${id}-lead`} className={styles.lead}>
          {t("community.lead")}
        </p>
        <img
          className={styles.qr}
          src={qrSrc}
          width={396}
          height={396}
          alt={t("community.qrAlt")}
          loading="lazy"
        />
        <p className={styles.hint}>{t("community.hint")}</p>
      </dialog>
    </>
  );
}
