import HeadingSmall from "@/components/heading-small";
import { ProfileForm } from "@/components/pages/settings/profile-profile";

export const metadata = {
  title: "LifeOS | Settings",
};

export default function Profile() {
  return (
    <>
      <div>
        <div className="space-y-6">
          <HeadingSmall
            title="Profile information"
            description="Update your name and email address"
          />
          <ProfileForm />
        </div>
      </div>
    </>
  );
}
