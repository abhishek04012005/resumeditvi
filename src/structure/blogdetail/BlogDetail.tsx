
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./blogdetail.module.css";
import Background from "../background/Background";
import Container from "../container/Container";
import {
  ThumbUp,
  Bookmark,
  BookmarkBorder,
  Person,
  CalendarToday,
  AccessTime,
  ArrowBack,
  Circle,
  Diamond,
  Star,
} from "@mui/icons-material";
import Heading from "../heading/Heading";
import Button from "../button/Button";
import Image from "next/image";
import blogPosts from "../../data/blog";
import type { StaticImageData } from "next/image";
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string | StaticImageData;
  likes: number;
  tags: string[];
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
    ogImage?: string;
    lastModified?: string;
  };
}

interface BlogDetailProps {
  post: BlogPost;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ post: initialPost }) => {
  const router = useRouter();
  const [post, setPost] = useState<BlogPost>(initialPost);
  const [relatedPosts] = useState<BlogPost[]>(
    blogPosts
      .filter(
        (p) => p.id !== initialPost.id && p.category === initialPost.category
      )
      .slice(0, 3)
  );
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  const duplicateFeaturedImage =
    typeof post.image === "string" &&
    post.content.includes(post.image);
  const [hasLiked, setHasLiked] = useState<boolean>(false);

  const handleLike = (): void => {
    if (!hasLiked) {
      setPost({
        ...post,
        likes: post.likes + 1,
      });
      setHasLiked(true);
    }
  };

  const handleBookmark = (): void => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Background>
      <div className={styles.blogDetails}>
        <div className={styles.blogdetailPageBackground}>
          <Circle className={`${styles.bgIcon} ${styles.bgIconOne}`} />
          <Diamond className={`${styles.bgIcon} ${styles.bgIconTwo}`} />
          <Star className={`${styles.bgIcon} ${styles.bgIconThree}`} />
          <div className={`${styles.bgCircle} ${styles.bgCirclePulse}`} />
        </div>
        <Container>
          <div className={styles.blogdetailWrapper}>
            <div className={styles.blogdetailHero}>
              <div className={styles.blogdetailNavigation}>
                <Button variant="secondary" onClick={() => router.back()}>
                  <ArrowBack />
                  Back
                </Button>

                <div className={styles.blogdetailActions}>
                  <button
                    className={`${styles.blogdetailActionButton} ${hasLiked ? styles.active : ""}`}
                    onClick={handleLike}
                    aria-label="Like article"
                  >
                    <ThumbUp />
                    <span>{post.likes}</span>
                  </button>
                  <button
                    className={`${styles.blogdetailActionButton} ${isBookmarked ? styles.active : ""}`}
                    onClick={handleBookmark}
                    aria-label="Bookmark article"
                  >
                    {isBookmarked ? <Bookmark /> : <BookmarkBorder />}
                  </button>
                </div>
              </div>

              <div className={styles.blogdetailHeader}>
                <div className={styles.blogdetailCategory}>{post.category}</div>
                <h1 className={styles.blogdetailTitle}>{post.title}</h1>

                <div className={styles.blogdetailMetaChips}>
                  <div className={styles.blogdetailMetaChip}>
                    <Person className={styles.metaIcon} />
                    <span>{post.author}</span>
                  </div>
                  <div className={styles.blogdetailMetaChip}>
                    <CalendarToday className={styles.metaIcon} />
                    <span>{post.date}</span>
                  </div>
                  <div className={styles.blogdetailMetaChip}>
                    <AccessTime className={styles.metaIcon} />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>

            {!duplicateFeaturedImage && (
              <div className={styles.blogdetailFeaturedImage}>
                <Image
                  src={post.image}
                  alt={post.title}
                  width={1200}
                  height={630}
                  priority
                />
              </div>
            )}

            <div className={styles.blogdetailContent}>
              <div
                className={styles.blogdetailText}
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className={styles.blogdetailTags}>
                {post.tags.map((tag, index) => (
                  <span key={index} className={styles.blogdetailTag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {relatedPosts.length > 0 && (
              <div className={styles.blogdetailRelated}>
                <Heading
                  title="Related Articles"
                  subtitle="Here are related posts"
                />
                <div className={styles.blogdetailRelatedGrid}>
                  {relatedPosts.map((relatedPost) => (
                    <div
                      key={relatedPost.id}
                      className={styles.blogdetailRelatedCard}
                      onClick={() =>
                        router.push(`/blog/${relatedPost.slug}`)
                      }
                    >
                      <div className={styles.relatedImage}>
                        <Image
                          src={relatedPost.image}
                          alt={relatedPost.title}
                          width={400}
                          height={225}
                          style={{ objectFit: 'cover' }}
                        />
                        <div className={styles.relatedCategory}>
                          {relatedPost.category}
                        </div>
                      </div>
                      <div className={styles.relatedContent}>
                        <h3>{relatedPost.title}</h3>
                        <p>{relatedPost.excerpt}</p>
                        <div className={styles.relatedMeta}>
                          <span>{relatedPost.date}</span>
                          <span>{relatedPost.readTime}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </Container>
      </div>
    </Background>
  );
};

export default BlogDetail;