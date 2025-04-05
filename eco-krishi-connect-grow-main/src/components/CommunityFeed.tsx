
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Share2, Send, Image, X } from 'lucide-react';
import ActionButton from './ui/ActionButton';
import FarmerCard from './ui/FarmerCard';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from './ui/dialog';

interface PostProps {
  author: {
    name: string;
    location: string;
    avatar: string;
  };
  content: string;
  likes: number;
  comments: number;
  timeAgo: string;
  image?: string;
  id: number; // Added ID for tracking posts
}

interface CommentProps {
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timeAgo: string;
  id: number;
}

const Post: React.FC<PostProps> = ({ id, author, content, likes, comments, timeAgo, image }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [postComments, setPostComments] = useState<CommentProps[]>([]);

  const handleLike = () => {
    if (liked) {
      setLikesCount(prev => prev - 1);
    } else {
      setLikesCount(prev => prev + 1);
    }
    setLiked(!liked);
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: Date.now(),
        author: {
          name: 'You',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        content: commentText,
        timeAgo: 'Just now'
      };
      setPostComments([...postComments, newComment]);
      setCommentText('');
    }
  };

  return (
    <div className="card-eco overflow-visible mb-6">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <Avatar className="w-10 h-10 mr-3">
            <AvatarImage src={author.avatar} alt={author.name} />
            <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-eco-dark">{author.name}</h4>
            <div className="flex items-center text-xs text-gray-500">
              <span>{author.location}</span>
              <span className="mx-1">•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 mb-4">{content}</p>
        
        {image && (
          <div className="mb-4 rounded-lg overflow-hidden bg-gray-100">
            <img src={image} alt="Post image" className="w-full h-auto" />
          </div>
        )}
        
        <div className="flex items-center justify-between text-sm text-gray-500 pt-2 border-t border-gray-100">
          <button 
            className={`flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors ${liked ? 'text-eco-primary' : ''}`}
            onClick={handleLike}
          >
            <ThumbsUp size={16} />
            <span>{likesCount}</span>
          </button>
          <button 
            className="flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageSquare size={16} />
            <span>{comments + postComments.length}</span>
          </button>
          <button className="flex items-center space-x-1 py-2 px-3 rounded-md hover:bg-gray-100 transition-colors">
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>

        {showComments && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            {postComments.length > 0 && (
              <div className="space-y-3 mb-3">
                {postComments.map(comment => (
                  <div key={comment.id} className="flex space-x-2">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                      <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-gray-50 p-2 rounded-lg">
                      <div className="flex justify-between">
                        <span className="font-medium text-sm">{comment.author.name}</span>
                        <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="flex items-center space-x-2">
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="Your avatar" />
                <AvatarFallback>Y</AvatarFallback>
              </Avatar>
              <div className="flex-1 flex items-center">
                <Textarea 
                  placeholder="Write a comment..." 
                  className="min-h-[36px] py-2 flex-grow"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleAddComment();
                    }
                  }}
                />
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="ml-2"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CommunityFeed: React.FC = () => {
  const [posts, setPosts] = useState<PostProps[]>([
    {
      id: 1,
      author: {
        name: 'Rajesh Kumar',
        location: 'Patna, Bihar',
        avatar: 'https://randomuser.me/api/portraits/men/42.jpg',
      },
      content: 'I tried the organic pest control method shared last week and it worked wonders for my tomato plants! No more aphids and my yield has improved. Thank you to everyone who suggested this!',
      likes: 24,
      comments: 8,
      timeAgo: '2 hours ago',
      image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=2574&auto=format&fit=crop',
    },
    {
      id: 2,
      author: {
        name: 'Lakshmi Devi',
        location: 'Vijayawada, Andhra Pradesh',
        avatar: 'https://randomuser.me/api/portraits/women/33.jpg',
      },
      content: 'Can anyone help identify what\'s happening to my paddy crop? These yellow spots started appearing last week after the rains.',
      likes: 5,
      comments: 12,
      timeAgo: '5 hours ago',
    },
  ]);

  const activeFarmers = [
    {
      name: 'Anand Singh',
      location: 'Uttar Pradesh',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      expertise: 'Organic Wheat',
    },
    {
      name: 'Meena Patel',
      location: 'Gujarat',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
      expertise: 'Cotton',
    },
    {
      name: 'Kabir Das',
      location: 'West Bengal',
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
      expertise: 'Rice',
    },
  ];

  const [postText, setPostText] = useState('');
  const [postImage, setPostImage] = useState<string | null>(null);
  const [showImageUpload, setShowImageUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);

  const handleCreatePost = () => {
    if (postText.trim()) {
      const newPost = {
        id: Date.now(),
        author: {
          name: 'You',
          location: 'Your Location',
          avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        },
        content: postText,
        likes: 0,
        comments: 0,
        timeAgo: 'Just now',
        image: postImage
      };
      setPosts([newPost, ...posts]);
      setPostText('');
      setPostImage(null);
      setShowImageUpload(false);
    }
  };

  const handleImageUrlSubmit = () => {
    setPostImage(imageUrl);
    setImageUrl('');
    setShowImageDialog(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="eco-container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8">
          <div>
            <h2 className="section-title mb-2">Community Feed</h2>
            <p className="text-gray-600 max-w-2xl">
              Connect with fellow farmers, share your experiences, ask questions, and learn from the community.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card-eco p-4 mb-6">
              <div className="flex">
                <Avatar className="w-10 h-10 mr-3">
                  <AvatarImage src="https://randomuser.me/api/portraits/men/1.jpg" alt="Your avatar" />
                  <AvatarFallback>Y</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <Textarea
                    className="border border-gray-200 rounded-lg p-3 text-gray-500 hover:border-gray-300 transition-colors w-full min-h-[80px]"
                    placeholder="Share your farming experience or ask a question..."
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                  />
                  
                  {postImage && (
                    <div className="relative mt-2 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={postImage} alt="Post image" className="max-h-[200px] w-auto mx-auto" />
                      <button 
                        className="absolute top-2 right-2 bg-gray-800 bg-opacity-70 text-white rounded-full p-1"
                        onClick={() => setPostImage(null)}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setShowImageDialog(true)}
                      className="text-gray-500"
                    >
                      <Image size={16} className="mr-1" />
                      Add Image
                    </Button>
                    <ActionButton 
                      variant="primary" 
                      size="sm"
                      onClick={handleCreatePost}
                      disabled={!postText.trim()}
                    >
                      Post
                    </ActionButton>
                  </div>
                </div>
              </div>
            </div>
            
            {posts.map((post) => (
              <Post key={post.id} {...post} />
            ))}
            
            <div className="text-center mt-4">
              <ActionButton variant="outlined">
                View More Posts
              </ActionButton>
            </div>
          </div>
          
          <div>
            <div className="card-eco overflow-hidden">
              <div className="bg-eco-primary p-4 text-white">
                <h3 className="font-semibold">Active Farmers</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  {activeFarmers.map((farmer, index) => (
                    <FarmerCard key={index} farmer={farmer} />
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <button className="text-eco-primary hover:text-eco-dark text-sm font-medium">
                    View All
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image URL</DialogTitle>
            <DialogDescription>
              Enter the URL of the image you want to add to your post
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <Input 
              placeholder="https://example.com/image.jpg" 
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowImageDialog(false)}>Cancel</Button>
              <Button onClick={handleImageUrlSubmit} disabled={!imageUrl.trim()}>Add Image</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default CommunityFeed;
