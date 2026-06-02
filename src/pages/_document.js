import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Script id="theme-switcher" strategy="beforeInteractive">
          {`(function () {
            var theme = localStorage.theme || 'classic';
            if (theme === 'dark') theme = 'kungfu';
            if (theme === 'light') theme = 'classic';
            var darkThemes = ['kungfu', 'ocean', 'noel'];
            document.documentElement.dataset.theme = theme;
            if (darkThemes.indexOf(theme) >= 0) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          })();`}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
