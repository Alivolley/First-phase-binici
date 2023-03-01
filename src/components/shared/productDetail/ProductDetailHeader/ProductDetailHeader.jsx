import styled from '@emotion/styled';
import { Button, Grid } from '@mui/material';
import React from 'react';

const ProductDetailHeader = ({ detail }) => {
  const { description, imageURL, preFix, title } = detail;

  return (
    <Wrapper>
      <Grid container spacing={5}>
        <Grid item xs={12} md={4}>
          <HeaderImage>
            <Image src={imageURL} />
          </HeaderImage>
        </Grid>
        <Grid item xs={12} md={8}>
          <FiledWrapper>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={4} lg={3}>
                <Ques>عنوان</Ques>
              </Grid>
              <Grid item xs={12} sm={9} md={8} lg={9}>
                <Describtion>{title}</Describtion>
              </Grid>
            </Grid>
          </FiledWrapper>

          <FiledWrapper>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={4} lg={3}>
                <Ques>توضیحات</Ques>
              </Grid>
              <Grid item xs={12} sm={9} md={8} lg={9}>
                <Describtion>{description || 'توضیحاتی ندارد'}</Describtion>
              </Grid>
            </Grid>
          </FiledWrapper>

          <FiledWrapper>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={4} lg={3}>
                <Ques>پیشوند</Ques>
              </Grid>
              <Grid item xs={12} sm={9} md={8} lg={9}>
                <Describtion>{preFix}</Describtion>
              </Grid>
            </Grid>
          </FiledWrapper>
        </Grid>
      </Grid>

      <BranchButton variant="contained">ثبت برنچ</BranchButton>
    </Wrapper>
  );
};

export default ProductDetailHeader;

const Wrapper = styled.div`
  margin-bottom: 90px;
`;

const HeaderImage = styled.div``;

const Image = styled.img`
  display: block;
  max-width: 100%;
  margin: 0 auto;
`;

const FiledWrapper = styled.div`
  margin-top: 10px;
  color: #707070;
`;

const Ques = styled.p`
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 15px;
`;

const Describtion = styled.p`
  padding: 15px;
  background-color: #f4f4f4;
  border-radius: 15px;
`;

const BranchButton = styled(Button)`
  background-color: #27348b;
  margin-top: 30px;
  margin-right: 20px;
`;
