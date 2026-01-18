'use client';

import React from 'react';
import CookieConsent from 'react-cookie-consent';

export default function CookieConsentBanner() {
    return (
        <CookieConsent
            location="bottom"
            buttonText="I understand"
            cookieName="ZeroG_CookieConsent"
            style={{
                background: '#1e293b', // slate-800
                color: '#f8fafc',    // slate-50
                fontSize: '14px',
                borderTop: '1px solid #334155' // slate-700
            }}
            buttonStyle={{
                background: '#3b82f6', // blue-500
                color: '#ffffff',
                fontSize: '13px',
                borderRadius: '6px',
                fontWeight: '600',
                padding: '8px 16px'
            }}
            expires={150}
        >
            This website uses cookies to enhance the user experience. By continuing to browse this site, you agree to our use of cookies.
        </CookieConsent>
    );
}
