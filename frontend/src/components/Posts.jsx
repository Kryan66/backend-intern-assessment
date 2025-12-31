import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { postsAPI } from '../utils/api';
import { useToast } from '../context/ToastContext';
import { Loading } from './Loading';
import { PostModal } from './PostModal';

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postsAPI.getPosts();
      setPosts(data);
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setModalOpen(true);
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setModalOpen(true);
  };

  const handleDeletePost = async (id) => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;

    try {
      await postsAPI.deletePost(id);
      showToast('Post deleted successfully!', 'success');
      loadPosts();
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handlePostSaved = () => {
    setModalOpen(false);
    setEditingPost(null);
    loadPosts();
  };

  if (loading) {
    return <Loading show={true} />;
  }

  return (
    <section className="page active">
      <div className="page-header">
        <h1>Posts</h1>
        {isAuthenticated && (
          <button className="btn btn-primary" onClick={handleCreatePost}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Create Post
          </button>
        )}
      </div>

      <div className="posts-container">
        <div className="posts-list">
          {posts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📝</div>
              <h3>No posts yet</h3>
              <p>Be the first to create a post!</p>
            </div>
          ) : (
            posts.map((post) => {
              const date = new Date(post.createdAt || post.created_at).toLocaleDateString();
              const isOwner = user && post.createdBy?._id === user._id;
              const canDelete = user?.role === 'admin';

              return (
                <div key={post._id} className="post-card">
                  <div className="post-header">
                    <div>
                      <h3 className="post-title">{post.title}</h3>
                      <p className="post-description">{post.description}</p>
                    </div>
                  </div>
                  <div className="post-meta">
                    <div>
                      <span>By {post.createdBy?.fullName || 'Unknown'}</span>
                      <span style={{ marginLeft: '1rem' }}>{date}</span>
                    </div>
                    {(isOwner || canDelete) && (
                      <div className="post-actions">
                        {isOwner && (
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => handleEditPost(post)}
                          >
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeletePost(post._id)}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {modalOpen && (
        <PostModal
          post={editingPost}
          onClose={() => {
            setModalOpen(false);
            setEditingPost(null);
          }}
          onSave={handlePostSaved}
        />
      )}
    </section>
  );
};
