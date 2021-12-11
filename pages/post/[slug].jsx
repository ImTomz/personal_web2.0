import S_post from './post.module.scss';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import BlockContent from '@sanity/block-content-to-react';

export const Post = ({ title, body, image }) => {
  // States ------------------------------
  const [imageUrl, setImageUrl] = useState('');

  // Hook on mount -----------------------
  useEffect(() => {
    const imgBuilder = imageUrlBuilder({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      dataset: 'production',
    });
    setImageUrl(imgBuilder.image(image));
  }, [image]);

  // Rendering component: Post -----------
  return (
    <div>
      <h1>{title}</h1>
      {imageUrl && (
        <Image
          src={`${imageUrl}`}
          alt='main-post-image'
          width={900}
          height={500}
        />
      )}
      <div>
        <BlockContent blocks={body} />
      </div>
    </div>
  );
};

export const getServerSideProps = async (pageContext) => {
  const pageSlug = pageContext.query.slug;

  if (!pageSlug) {
    return {
      notFound: true,
    };
  }

  const query = encodeURIComponent(
    `*[ _type == "post" && slug.current == "${pageSlug}"]`
  );
  const projectID = process.env.NEXT_PUBLIC_PROJECT_ID;
  const url = `https://${projectID}.api.sanity.io/v1/data/query/production?query=${query}`;

  const result = await fetch(url).then((res) => res.json());
  const post = result.result[0];

  if (!post) {
    return {
      notFound: true,
    };
  } else {
    return {
      props: {
        body: post.body,
        title: post.title,
        image: post.mainImage,
      },
    };
  }
};

export default Post;

