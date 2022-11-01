import { GetServerSideProps, NextPage } from "next";
import { previewTree } from "src/mailing/util/previewTree";

export const getServerSideProps: GetServerSideProps = async () => {
  let destination = "/previews";
  const tree = await previewTree();

  // Show `tree[1]` as first preview because `tree[0]` will always be "Examples".
  const firstPreview = tree[1];
  if (firstPreview && firstPreview[1]?.length) {
    destination = `/previews/${firstPreview[0]}/${firstPreview[1][0]}`;
  }

  return {
    redirect: {
      destination,
      permanent: false,
    },
  };
};

const Home: NextPage = () => {
  return null;
};

export default Home;
