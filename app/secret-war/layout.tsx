import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The Secret War | A Novel by Todd Burleson",
    description: "Overview and resources for The Secret War by Todd Burleson.",
};

export default function SecretWarLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
