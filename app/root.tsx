import { withEmotionCache } from "@emotion/react";
import { json, MetaFunction } from "@remix-run/node"; // Depends on the runtime you choose
import { Link, Links, LiveReload, Meta, NavLink, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import { SaasProvider } from "@saas-ui/react";
import { theme } from "app/core/lib/theme/theme";
import React, { useContext, useEffect } from "react";
import { IntlProvider } from "react-intl";
import { useMatch } from "react-router";

import { ClientStyleContext, ServerStyleContext } from "./context";

// const host = process.env.NODE_ENV === "production" ? "your-domain.com" : "localhost:3000";

/**
 * Meta
 */
export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Core",
    viewport: "width=device-width,initial-scale=1"
});



interface DocumentProps {
    children: React.ReactNode;
}

const Document = withEmotionCache(
    ({ children }: DocumentProps, emotionCache) => {
        const serverStyleData = useContext(ServerStyleContext);
        const clientStyleData = useContext(ClientStyleContext);

        // Only executed on client
        useEffect(() => {
            // re-link sheet container
            emotionCache.sheet.container = document.head;
            // re-inject tags
            const tags = emotionCache.sheet.tags;
            emotionCache.sheet.flush();
            tags.forEach((tag) => {
                (emotionCache.sheet as any)._insertTag(tag);
            });
            // reset cache to reapply global styles
            clientStyleData?.reset();
        }, []);

        return (
            <html>
            <head>
                <Meta />
                <Links />
                {serverStyleData?.map(({ key, ids, css }) => (
                    <style
                        key={key}
                        data-emotion={`${key} ${ids.join(" ")}`}
                        dangerouslySetInnerHTML={{ __html: css }}
                    />
                ))}
            </head>
            <body>
            {children}
            <ScrollRestoration />
            <Scripts />
            <LiveReload />
            </body>
            </html>
        );
    }
);


const LinkComponent = (props: any) => {
    console.log("LinkComponent", props);
    const { href, isActive, ...rest } = props;
    const isMatch = useMatch(href);
    console.log(isMatch);
    return <Link to={href} {...rest} isActive={isMatch || isActive} />;
};

export default function App() {
    return (
        <IntlProvider locale="en" defaultLocale="en">
            <Document>
                {/*<IsomorphicNavProvider host={host} defaultPrefetch="intent" useTrailingSlash openOutgoingAsBlank>*/}
                <SaasProvider theme={theme} linkComponent={LinkComponent}>
                    <Outlet />
                </SaasProvider>
                {/*</IsomorphicNavProvider>*/}
            </Document>
        </IntlProvider>
    );
}
