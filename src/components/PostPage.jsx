import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import html2canvas from 'html2canvas';

const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-top: 10px;
`;

const Input = styled.input`
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  padding: 10px;
  margin-top: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const PostPreview = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  background-color: #f9f9f9;
  position: relative;
`;

const PostTitle = styled.h2`
  color: #333;
`;

const PostContent = styled.p`
  color: #666;
`;

const PostImage = styled.img`
  max-width: 100%;
`;

const Logo = styled.img`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 100px;
`;

const PostPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const generateOgImage = () => {
    html2canvas(document.querySelector('#post')).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      setGeneratedImageUrl(imgData);
    });
  };

  useEffect(() => {
    if (generatedImageUrl) {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      meta.content = generatedImageUrl;
      document.getElementsByTagName('head')[0].appendChild(meta);
    }
  }, [generatedImageUrl]);

  return (
    <Container>
      <h1>Create Post</h1>
      <Form>
        <Label>Title:</Label>
        <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Label>Content:</Label>
        <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        <Label>Image:</Label>
        <Input type="file" onChange={handleImageUpload} />
      </Form>
      <Button onClick={generateOgImage}>Generate OG Image</Button>
      <PostPreview id="post">
        <PostTitle>{title}</PostTitle>
        <PostContent>{content}</PostContent>
        {image && <PostImage src={image} alt="Post" />}
        <Logo src="/assets/logo.png" alt="" />
      </PostPreview>
      {generatedImageUrl && (
        <div>
          <h2>Generated OG Image:</h2>
          <img src={generatedImageUrl} alt="OG Image" style={{ maxWidth: '100%' }} />
        </div>
      )}
    </Container>
  );
};

export default PostPage;
