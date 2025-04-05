
import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Hero from '../components/Hero';
import FeatureSection from '../components/FeatureSection';
import KnowledgeHub from '../components/KnowledgeHub';
import CommunityFeed from '../components/CommunityFeed';
import Marketplace from '../components/Marketplace';

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      <FeatureSection />
      <KnowledgeHub />
      <CommunityFeed />
      <Marketplace />
    </MainLayout>
  );
};

export default Index;
