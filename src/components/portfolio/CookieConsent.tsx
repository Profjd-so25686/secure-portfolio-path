import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const CONSENT_KEY = "cookie_consent_v1";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY);
    if (!saved) setVisible(true);
  }, []);

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
  };
  const deny = () => {
    localStorage.setItem(CONSENT_KEY, "denied");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="dialog"
      aria-live="polite"
      className="fixed left-6 bottom-6 z-50 max-w-sm rounded-xl border bg-card p-4 text-sm shadow-lg"
    >
      <p className="text-muted-foreground">
        By using this site, you agree to the storing of cookies on your device.
        See our <a className="underline" href="#">Privacy Notice</a>.
      </p>
      <div className="mt-3 flex gap-2">
        <Button variant="hero" onClick={accept} className="px-5">Accept</Button>
        <Button variant="outline" onClick={deny}>Deny</Button>
      </div>
    </aside>
  );
};

export default CookieConsent;
