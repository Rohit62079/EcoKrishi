
import React, { useState } from 'react';
import MainLayout from '../components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Droplet, Sprout, Sun, Wind } from 'lucide-react';
import { Label } from '@/components/ui/label';

const FarmAIPage = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<{
    crops: string[];
    fertilityTips: string[];
    wateringGuidelines: string;
    additionalAdvice: string;
  } | null>(null);

  // Mock AI response generator
  const generateMockResponse = (soilInfo: string) => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Simple keyword matching for demonstration
      const soilInfoLower = soilInfo.toLowerCase();
      
      let crops = [];
      let fertilityTips = [];
      let wateringGuidelines = '';
      let additionalAdvice = '';
      
      // Very basic "AI" logic based on keywords
      if (soilInfoLower.includes('clay')) {
        crops = ['Rice', 'Wheat', 'Cabbage', 'Broccoli'];
        fertilityTips = [
          'Add organic matter to improve drainage',
          'Consider adding gypsum to break up clay particles',
          'Implement crop rotation with legumes to fix nitrogen'
        ];
        wateringGuidelines = 'Clay soil retains water well. Water deeply but less frequently to prevent waterlogging. Around 25-30mm per week is typically sufficient.';
        additionalAdvice = 'Clay soils are nutrient-rich but can become compacted. Avoid tilling when wet and consider raised beds for better drainage.';
      } 
      else if (soilInfoLower.includes('sandy')) {
        crops = ['Carrots', 'Potatoes', 'Melons', 'Tomatoes'];
        fertilityTips = [
          'Add compost regularly to improve water retention',
          'Use mulch to prevent moisture loss',
          'Consider cover crops during off-seasons'
        ];
        wateringGuidelines = 'Sandy soil drains quickly. Water more frequently with smaller amounts. About 30-35mm per week, divided into 2-3 sessions.';
        additionalAdvice = 'Sandy soils warm up quickly in spring, making them good for early planting. However, nutrients leach easily, so regular fertilization is important.';
      }
      else if (soilInfoLower.includes('loam')) {
        crops = ['Most vegetables', 'Corn', 'Soybeans', 'Fruit trees'];
        fertilityTips = [
          'Maintain organic matter with compost additions',
          'Use balanced fertilizer for most crops',
          'Implement regular soil testing'
        ];
        wateringGuidelines = 'Loam soil has excellent water retention and drainage. Water moderately, around 25mm per week depending on weather conditions.';
        additionalAdvice = 'Loam is ideal for most farming. Focus on maintaining its structure by avoiding compaction and adding organic matter regularly.';
      }
      else {
        crops = ['Consider soil testing to determine optimal crops'];
        fertilityTips = [
          'Get professional soil analysis',
          'Add organic matter like compost',
          'Balance pH levels based on test results'
        ];
        wateringGuidelines = 'Water requirements depend on specific soil characteristics. Start with moderate watering (25mm per week) and adjust based on plant response.';
        additionalAdvice = 'Without specific soil information, focus on improving soil health through organic additions and monitoring plant performance.';
      }
      
      setRecommendation({
        crops,
        fertilityTips,
        wateringGuidelines,
        additionalAdvice
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      generateMockResponse(query);
    }
  };

  return (
    <MainLayout>
      <div className="pt-8 bg-eco-light">
        <div className="eco-container">
          <h1 className="text-3xl font-bold mb-4 text-eco-dark">FarmAI Assistant</h1>
          <p className="text-gray-600 mb-8 max-w-3xl">
            Get personalized farming recommendations based on your soil composition. Our AI will suggest suitable crops, fertility improvement techniques, and optimal watering guidelines.
          </p>
        </div>
      </div>
      
      <div className="eco-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Soil Analysis & Recommendations</CardTitle>
                <CardDescription>Describe your soil characteristics or test results below</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="soil-info">Soil Information</Label>
                      <Textarea 
                        id="soil-info"
                        className="h-32 mt-2"
                        placeholder="Describe your soil characteristics (e.g., clay, sandy, loamy), pH level, moisture content, or any other relevant details you know about your soil."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-eco-primary hover:bg-eco-primary/90" 
                      disabled={isLoading}
                    >
                      {isLoading ? 'Analyzing...' : 'Get Farming Recommendations'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {recommendation && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>Farming Recommendations</CardTitle>
                  <CardDescription>Based on your soil characteristics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        <Sprout className="mr-2 h-5 w-5 text-green-600" />
                        Recommended Crops
                      </h3>
                      <ul className="mt-2 ml-7 list-disc text-gray-700">
                        {recommendation.crops.map((crop, index) => (
                          <li key={index}>{crop}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        <Sun className="mr-2 h-5 w-5 text-amber-500" />
                        Soil Fertility Improvement
                      </h3>
                      <ul className="mt-2 ml-7 list-disc text-gray-700">
                        {recommendation.fertilityTips.map((tip, index) => (
                          <li key={index}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        <Droplet className="mr-2 h-5 w-5 text-blue-500" />
                        Watering Guidelines
                      </h3>
                      <p className="mt-2 text-gray-700">{recommendation.wateringGuidelines}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-semibold flex items-center">
                        <Wind className="mr-2 h-5 w-5 text-eco-primary" />
                        Additional Farming Advice
                      </h3>
                      <p className="mt-2 text-gray-700">{recommendation.additionalAdvice}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-eco-primary/10 flex items-center justify-center mr-3">
                      <span className="font-bold text-eco-primary">1</span>
                    </div>
                    <h3 className="font-semibold">Describe Your Soil</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Provide details about your soil composition, pH levels, and any other characteristics you're aware of.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-eco-primary/10 flex items-center justify-center mr-3">
                      <span className="font-bold text-eco-primary">2</span>
                    </div>
                    <h3 className="font-semibold">AI Analysis</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our AI analyzes your soil information and compares it with best farming practices for similar soil profiles.
                  </p>
                </div>
                
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex items-center mb-2">
                    <div className="h-8 w-8 rounded-full bg-eco-primary/10 flex items-center justify-center mr-3">
                      <span className="font-bold text-eco-primary">3</span>
                    </div>
                    <h3 className="font-semibold">Get Recommendations</h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    Receive personalized crop suggestions, fertility improvement tips, and watering guidelines specific to your soil.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">
                  For professional soil analysis, consider using a soil testing kit or consulting with a local agricultural extension office.
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default FarmAIPage;
