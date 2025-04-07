import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Avatar,
  Snackbar,
  Alert,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import { POST_RESPONE_ADD, selectPostStatus } from '../../store';

export function CreatePost({ isUser }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postStatus = useSelector(selectPostStatus);
  const [isError, setIsError] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState({
    userId: isUser.id,
    id: `postId_${uuidv4()}`,
    content: '',
    img: '',
  });

  const [preview, setPreview] = useState(null);

  function handleChange(e) {
    setPost((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    if (!post.content.trim()) {
      setIsError('Content is required!');
      return;
    } else {
      setIsError('');
    }

    dispatch(POST_RESPONE_ADD(post));

    setPost({ id: `postId_${uuidv4()}`, content: '', img: '' });
    setLoading(true);

    if (postStatus === 'success' || postStatus === 'error') setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1000);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  }

  function previewHandler() {
    if (!post.content.trim()) {
      setIsError('Content is required for preview!');
      return;
    } else {
      setIsError('');
    }
    setPreview(post);
  }

  return (
    <Container sx={{ maxWidth: '600px', mt: 3 }}>
      <Typography
        variant="h5"
        sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}
      >
        Create new post
      </Typography>
      <Box component="form" onSubmit={submitHandler}>
        <TextField
          fullWidth
          label="Enter your text"
          name="content"
          value={post.content}
          onChange={handleChange}
          multiline
          rows={4}
          required
          sx={{ mb: 2 }}
          error={isError}
        />
        <TextField
          fullWidth
          label="Paste image URL"
          name="img"
          value={post.img}
          onChange={handleChange}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          loading={loading}
          variant="contained"
          sx={{ mr: 2 }}
        >
          Create Post
        </Button>
        <Button type="button" variant="outlined" onClick={previewHandler}>
          Preview
        </Button>
      </Box>

      {preview && (
        <Box sx={{ mt: 4 }}>
          <Card
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              borderRadius: '20px',
            }}
          >
            <CardHeader
              avatar={<Avatar>{isUser?.profile_picture_letter || 'U'}</Avatar>}
              title={isUser?.first_name + ' ' + isUser?.last_name}
            />
            {preview.img && (
              <CardMedia
                component="img"
                height="300"
                image={preview.img}
                alt="Post preview"
              />
            )}
            <CardContent>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {preview.content}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
      <Snackbar open={open}>
        <Alert severity={postStatus} variant="filled" sx={{ width: '100%' }}>
          {`Post create - ${postStatus}!`}
        </Alert>
      </Snackbar>
    </Container>
  );
}
