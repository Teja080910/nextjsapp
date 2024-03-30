import { Meta } from "@/layout/Meta";
import { Homepage } from "@/screens/HomePage";

const Index = () => {
  return (
    <Homepage
      meta={
        <Meta
          title="Destination Changer"
          description="Change your destination with ease"
          canonical="https://destination-changer.vercel.app/"
        />
      }
    />
  );
};

export default Index;