
import React, { useState } from 'react';
import { ArrowRight, UserPlus, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ActionButton from './ui/ActionButton';
import { Button } from './ui/button';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { useToast } from "@/hooks/use-toast";
import { useAuth, SignedIn, SignedOut } from '../contexts/AuthContext';

const Hero: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isSignedIn, user } = useAuth();

  const handleJoinClick = () => {
    if (isSignedIn) {
      // If already signed in, open the profile completion dialog
      setOpen(true);
    } else {
      // If not signed in, redirect to sign up page
      navigate('/sign-up');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to update user profile
    setTimeout(() => {
      setIsSubmitting(false);
      setOpen(false);
      
      // Show success message
      toast({
        title: "Profile completed!",
        description: "Welcome to EcoKrishi. We've sent you an email with next steps.",
        variant: "default",
      });
      
      // Reset form
      setPhone('');
    }, 1500);
  };

  return (
    <div className="relative bg-eco-light overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="eco-container relative">
        <div className="py-12 md:py-20 max-w-3xl">
          <div className="animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-eco-dark leading-tight mb-4">
              Connect, Learn, and Grow with <span className="text-eco-primary">EcoKrishi</span>
            </h1>
            
            <p className="text-gray-700 text-lg md:text-xl mb-8">
              Empowering organic farmers through community, knowledge sharing, and direct market access.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <SignedOut>
                <ActionButton 
                  variant="primary" 
                  size="lg"
                  icon={<UserPlus size={20} />}
                  onClick={handleJoinClick}
                >
                  Join EcoKrishi
                </ActionButton>
              </SignedOut>
              
              <SignedIn>
                <ActionButton 
                  variant="primary" 
                  size="lg"
                  icon={<UserPlus size={20} />}
                  onClick={handleJoinClick}
                >
                  Complete Profile
                </ActionButton>
              </SignedIn>
              
              <ActionButton 
                variant="outlined" 
                size="lg"
              >
                Learn More
              </ActionButton>
            </div>
            
            <div className="mt-8 flex items-center space-x-2">
              <span className="inline-block h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-gray-600">Available in 6+ regional languages</span>
            </div>
          </div>
        </div>
      </div>

      <SignedIn>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl text-center">Complete Your Profile</DialogTitle>
              <DialogDescription className="text-center">
                Add your contact details to access all EcoKrishi features.
              </DialogDescription>
            </DialogHeader>
            
            <form onSubmit={handleSubmit} className="space-y-4 py-3">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  value={user?.fullName || ''}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="tel" 
                  placeholder="Enter your phone number" 
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  value={user?.email || ''}
                  readOnly
                  className="bg-gray-50"
                />
              </div>
              
              <DialogFooter className="mt-6 gap-2 sm:gap-0">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : 'Complete Profile'}
                  {!isSubmitting && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </SignedIn>
    </div>
  );
};

export default Hero;
