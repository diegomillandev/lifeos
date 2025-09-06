import HeadingSmall from "@/components/heading-small";
import { PasswordProfile } from "@/components/pages/settings/password-profile";

export const metadata = {
  title: "LifeOS | Settings",
};

export default function Password() {
  return (
    <>
      <div className="space-y-6">
        <HeadingSmall
          title="Update password"
          description="Ensure your account is using a long, random password to stay secure"
        />

        <PasswordProfile />
      </div>
    </>
  );
}
