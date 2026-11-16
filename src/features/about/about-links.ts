/** The open-source guide this site is built on. */
export const UPSTREAM_URL = "https://github.com/agharsallah/esp-labs-web";

/** The licence text, with the original copyright notice, as this site ships it. */
export const LICENSE_URL = "https://github.com/sanool/esp-labs-web/blob/esp32fans/LICENSE";

/** Where readers report a mistake or propose a lab: this site's own tracker, not the original's. */
export const ISSUES_URL = "https://github.com/sanool/esp-labs-web/issues/new";

/** A click on a modal dialog's backdrop targets the dialog itself, outside its box. */
export function isOutside(
  box: Pick<DOMRectReadOnly, "left" | "right" | "top" | "bottom">,
   x: number, y: number): boolean {
  return x < box.left || x > box.right || y < box.top || y > box.bottom;
}
