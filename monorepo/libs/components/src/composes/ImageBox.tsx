import React from 'react';
import { Flex, Text, Image, Heading } from '@chakra-ui/react';
import styled from "@emotion/styled";

const WrapperStyled = styled.div`
  filter: contrast(70%);
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);
  display: flex;
  align-items: center;
  width: 100%;
  height: 188px;
  background-color: #424242;

  svg {
    margin: auto;
  }
  img {
    width: 100%;
    height: 188px;
  }
`;

export const ImageSVG: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="130"
      height="130"
      viewBox="0 0 44 30"
    >
      <g fill="none" fillRule="evenodd">
        <g fill="#50E3C2">
          <path d="M23.335 2.136c.287-1.628-.287-1.883-1.29-.56L13.92 12.301c-.999 1.32-.482 2.622 1.15 2.91l2.821.498a3.001 3.001 0 003.479-2.428l1.965-11.146z"></path>
          <path d="M17.332 28.504c-.288 1.629.287 1.884 1.289.56l8.126-10.726c.999-1.319.482-2.622-1.15-2.91l-2.821-.497a3.001 3.001 0 00-3.48 2.427l-1.964 11.146z"></path>
        </g>
        <path
          fill="#000"
          d="M7.027 8.862l4.823-2.656a2.44 2.44 0 013.343 1.005l.014.026a2.5 2.5 0 01.275 1.452l3.587-.19a2.32 2.32 0 012.433 2.204 2.33 2.33 0 01-1.293 2.213 2.328 2.328 0 011.206 1.924 2.328 2.328 0 01-1.64 2.35c.342.382.56.88.59 1.434a2.323 2.323 0 01-2.192 2.447l-.302.016c.33.38.54.868.568 1.41a2.323 2.323 0 01-2.19 2.447l-2.304.121h-.01l-.018.016s-1.179.019-1.354.019c-.175 0-.964-.044-1.577-.132-.18-.026-.877-.177-1.384-.292-1.075-.245-2.965-1.276-4.581-2.382l-.15-.094a1.391 1.391 0 00-.245-.118l-3.66-.328a.977.977 0 01-.871-.958v-9.081c0-.487.39-.916.871-.959l2.812-.251c.408-.092.827-.24 1.203-.517.263-.194 1.145-.661 2.046-1.126zm29.546 0L31.75 6.206a2.44 2.44 0 00-3.343 1.005l-.014.026a2.5 2.5 0 00-.275 1.452l-3.587-.19a2.32 2.32 0 00-2.433 2.204 2.33 2.33 0 001.293 2.213 2.328 2.328 0 00-1.206 1.924 2.328 2.328 0 001.64 2.35 2.33 2.33 0 00-.59 1.434 2.323 2.323 0 002.192 2.447l.302.016c-.33.38-.54.868-.568 1.41a2.323 2.323 0 002.19 2.447l2.304.121h.01l.018.016s1.179.019 1.354.019c.175 0 .964-.044 1.577-.132.18-.026.877-.177 1.384-.292 1.075-.245 2.965-1.276 4.581-2.382l.15-.094c.07-.044.152-.083.245-.118l3.66-.328a.977.977 0 00.871-.958v-9.081a.978.978 0 00-.871-.959l-2.812-.251c-.408-.092-.827-.24-1.203-.517-.263-.194-1.145-.661-2.046-1.126z"
        ></path>
      </g>
    </svg>
  )
};

export const FallbackImage: React.FC = () => {
  return (
    <WrapperStyled>
      <ImageSVG />
    </WrapperStyled>
  )
};

export interface ImageBoxProps {
  imageSrc?: string
  title: string
  author: string
  onClick?: () => void
}

export const ImageBox: React.FC<ImageBoxProps> = ({
  imageSrc,
  title,
  author,
  onClick
}) => (
  <Flex
    direction="column"
    as={onClick ? "button" : "div"}
    w="auto"
    boxShadow="sm"
    overflow="hidden"
    bg="white"
    onClick={onClick}
  >
    <Image
      src={imageSrc}
      alt={title}
      objectFit="cover"
      fallback={<FallbackImage />}
      w="100%"
      h="188px"
    />
    <Flex direction="column" w="100%" p={4} textAlign="left">
      <Heading as="h4" fontWeight="extrabold" size="md">{title}</Heading>
      <Text>{author}</Text>
    </Flex>
  </Flex>
);