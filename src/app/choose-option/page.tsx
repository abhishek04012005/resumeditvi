// src/app/choose-option/page.tsx
import ChooseOption from '../../structure/chooseoption/ChooseOption';
import { UserDetails, ModelDetails } from '../../structure/chooseoption/ChooseOption';

interface PageProps {
  searchParams: Promise<{
    name?: string;
    mobileNumber?: string;
    service?: string;
    modelNumber?: string;
    language?: string;
    amount?: string;
    type?: string;
  }>;
}

export default async function ChooseOptionPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;

  const userDetails: UserDetails = {
    name: resolvedParams.name || '',
    mobileNumber: resolvedParams.mobileNumber || '',
  };

  const modelDetails: ModelDetails = {
    modelNumber: resolvedParams.modelNumber || '',
    language: resolvedParams.language || 'English',
    type: resolvedParams.service || resolvedParams.type || 'resume',
    amount: Number(resolvedParams.amount || 0),
  };

  return (
    <ChooseOption
      userDetails={userDetails}
      modelDetails={modelDetails}
    />
  );
}
