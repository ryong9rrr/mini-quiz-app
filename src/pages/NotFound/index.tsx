import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, Text } from "~/components/atom";
import data from "~/lib/data/notFound.json";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: data,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleClickButton = () => {
    navigate("/");
  };

  return (
    <div>
      <Lottie options={defaultOptions} height={400} width={400} />
      <Texts>
        <Text size="lg">존재하지 않는 페이지입니다.</Text>
        <Button onClick={handleClickButton}>홈으로</Button>
      </Texts>
    </div>
  );
};

export default NotFoundPage;

const Texts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
`;
