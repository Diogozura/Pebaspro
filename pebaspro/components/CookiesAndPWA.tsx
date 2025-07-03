'use client';

import React from 'react';

import AddToHomePrompt from './AddToHomePrompt';
import CookieConsent from './CookieConsentWithPWA';

export default function CookiesAndPWA() {
  const [permitirPWA, setPermitirPWA] = React.useState(false);

  return (
    <>
      <CookieConsent onAccepted={() => setPermitirPWA(true)} />
      {permitirPWA && <AddToHomePrompt />}
    </>
  );
}
