'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@monkedeals/ui/components/badge';
import { Button } from '@monkedeals/ui/components/button';
import { Card, CardContent, CardHeader } from '@monkedeals/ui/components/card';
import { Input } from '@monkedeals/ui/components/input';
import { Label } from '@monkedeals/ui/components/label';
import RichTextEditor from 'components/RichTextEditor';
import { Check } from 'lucide-react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

// -------------- Types & Schema --------------
const dealFormSchema = z.object({
  // Step 1: Info & Setup
  dealUrl: z.string().url().optional().or(z.literal('')),
  dealTitle: z.string().min(10, 'Title must be at least 10 characters'),
  salePrice: z.string().min(1, 'Sale price is required'),
  listPrice: z.string().min(1, 'List price is required'),

  // Step 2: Description

  // Step 3: Configuration
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  tags: z.array(z.string()),
  brands: z.array(z.string()),

  // Step 4: NFT Details
  merchantWallet: z.string().optional(),
  couponType: z.string(),
  nftReward: z.string().optional(),

  // Images
  images: z.array(z.any()).optional(),
});

export type DealFormData = z.infer<typeof dealFormSchema>;

export interface Step {
  id: number;
  title: string;
  description: string;
}

export const steps: Step[] = [
  { id: 1, title: 'Info & Setup', description: 'Basic deal information' },
  { id: 2, title: 'Description', description: 'Detailed description' },
  { id: 3, title: 'Configuration', description: 'Tags and options' },
  { id: 4, title: 'NFT Details', description: 'Blockchain details' },
  { id: 5, title: 'Review', description: 'Review and submit' },
];

// -------------- Stepper Component --------------
interface StepperProps {
  currentStep: number;
  steps: Step[];
}

export const Stepper: React.FC<StepperProps> = ({ currentStep, steps }) => {
  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  step.id < currentStep
                    ? 'bg-primary border-primary text-white'
                    : step.id === currentStep
                      ? 'border-primary text-primary bg-white'
                      : 'border-border-default text-gray-400 bg-white'
                }`}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-semibold">{step.id}</span>
                )}
              </div>
              <div className="text-center mt-2">
                <p
                  className={`text-sm font-medium ${
                    step.id <= currentStep ? 'text-gray-800' : 'text-gray-400'
                  }`}
                >
                  {step.title}
                </p>
                <p className="text-xs text-gray-200 hidden sm:block">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-2 transition-all ${
                  step.id < currentStep ? 'bg-primary' : 'bg-border-default'
                }`}
                style={{ maxWidth: '80px' }}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// -------------- Tag Input Component --------------
interface TagInputProps {
  label: string;
  field: string;
  tags: string[];
  tempValue: string;
  onTempChange: (value: string) => void;
  onAdd: () => void;
  onRemove: (tag: string) => void;
  error?: string;
}

export const TagInput: React.FC<TagInputProps> = ({
  label,
  tags,
  tempValue,
  onTempChange,
  onAdd,
  onRemove,
  error,
}) => {
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onAdd();
    }
  };

  return (
    <div>
      <Label className="mb-2 block">{label}</Label>
      <div className="flex gap-2">
        <Input
          value={tempValue}
          onChange={(e) => onTempChange(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add..."
        />
        <Button
          type="button"
          onClick={onAdd}
          className="bg-primary uppercase hover:bg-green-700 text-white"
        >
          Add
        </Button>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <div className="flex gap-2 mt-2 flex-wrap">
        {tags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => onRemove(tag)}
            className="cursor-pointer bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
          >
            {tag} ✕
          </Badge>
        ))}
      </div>
    </div>
  );
};

// -------------- Main Form Component --------------
export const CreateDealForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tempTags, setTempTags] = useState({
    tags: '',
    brands: '',
    categories: '',
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<DealFormData>({
    resolver: zodResolver(dealFormSchema),
    defaultValues: {
      dealUrl: '',
      dealTitle: '',
      salePrice: '',
      listPrice: '',
      description: '',
      categories: [],
      tags: [],
      brands: [],
      couponType: 'Discount Code',
      merchantWallet: '',
      nftReward: '',
      images: [],
    },
  });

  const formData = watch();

  const addTag = (field: 'tags' | 'brands' | 'categories') => {
    const input = tempTags[field].trim();
    if (input && !formData[field].includes(input)) {
      setValue(field, [...formData[field], input]);
      setTempTags((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const removeTag = (field: 'tags' | 'brands' | 'categories', tag: string) => {
    setValue(
      field,
      formData[field].filter((t) => t !== tag),
    );
  };

  const nextStep = async () => {
    let fieldsToValidate: (keyof DealFormData)[] = [];

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['dealUrl', 'dealTitle', 'salePrice', 'listPrice'];
        break;
      case 2:
        fieldsToValidate = ['description'];
        break;
      case 3:
        fieldsToValidate = ['categories', 'tags', 'brands'];
        break;
      case 4:
        fieldsToValidate = ['merchantWallet', 'couponType', 'nftReward'];
        break;
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const onSubmit = (data: DealFormData) => {
    console.log('Deal Data:', data);
    // TODO: Submit to backend
  };

  return (
    <Card className="max-w-4xl mx-auto border border-border-default rounded-lg shadow-none">
      <CardHeader>
        <h2 className="text2xl uppercase font-semibold text-center">
          Post a New Deal
        </h2>
        <p className="text-sm text-center text-gray-600">
          Want to post a great deal? Keep your title clear and include price,
          store, and perks!
        </p>
        <Stepper currentStep={currentStep} steps={steps} />
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Info & Setup */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="dealUrl">Deal URL (optional)</Label>
                <Input
                  id="dealUrl"
                  {...register('dealUrl')}
                  placeholder="https://..."
                  className="mt-1"
                />
                {errors.dealUrl && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dealUrl.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="dealTitle">Deal Title *</Label>
                <Input
                  id="dealTitle"
                  {...register('dealTitle')}
                  placeholder='e.g., "65" TCL QLED 4K TV + Free Shipping $549"'
                  className="mt-1"
                />
                {errors.dealTitle && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.dealTitle.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="salePrice">Sale Price *</Label>
                  <Input
                    id="salePrice"
                    {...register('salePrice')}
                    placeholder="549"
                    className="mt-1"
                  />
                  {errors.salePrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.salePrice.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="listPrice">List Price *</Label>
                  <Input
                    id="listPrice"
                    {...register('listPrice')}
                    placeholder="799"
                    className="mt-1"
                  />
                  {errors.listPrice && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.listPrice.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Description */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <RichTextEditor />
              </div>
            </div>
          )}

          {/* Step 3: Configuration */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <TagInput
                label="Categories *"
                field="categories"
                tags={formData.categories}
                tempValue={tempTags.categories}
                onTempChange={(val) =>
                  setTempTags((prev) => ({ ...prev, categories: val }))
                }
                onAdd={() => addTag('categories')}
                onRemove={(tag) => removeTag('categories', tag)}
                error={errors.categories?.message}
              />

              <TagInput
                label="Tags"
                field="tags"
                tags={formData.tags}
                tempValue={tempTags.tags}
                onTempChange={(val) =>
                  setTempTags((prev) => ({ ...prev, tags: val }))
                }
                onAdd={() => addTag('tags')}
                onRemove={(tag) => removeTag('tags', tag)}
              />

              <TagInput
                label="Brands"
                field="brands"
                tags={formData.brands}
                tempValue={tempTags.brands}
                onTempChange={(val) =>
                  setTempTags((prev) => ({ ...prev, brands: val }))
                }
                onAdd={() => addTag('brands')}
                onRemove={(tag) => removeTag('brands', tag)}
              />
            </div>
          )}

          {/* Step 4: NFT Details */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="couponType">Coupon Type</Label>
                <select
                  id="couponType"
                  {...register('couponType')}
                  className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option>Discount Code</option>
                  <option>Cashback</option>
                  <option>BOGO (Buy One Get One)</option>
                  <option>Free Shipping</option>
                  <option>NFT Reward</option>
                </select>
              </div>

              <div>
                <Label htmlFor="merchantWallet">Merchant Wallet Address</Label>
                <Input
                  id="merchantWallet"
                  {...register('merchantWallet')}
                  placeholder="0x..."
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="nftReward">NFT Reward Details</Label>
                <Input
                  id="nftReward"
                  {...register('nftReward')}
                  placeholder="Optional NFT reward information"
                  className="mt-1"
                />
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Review Your Deal</h3>
              <div className="border border-border-default bg-white p-4 rounded-lg space-y-3">
                <div>
                  <span className="font-medium">Title:</span>{' '}
                  {formData.dealTitle}
                </div>
                <div>
                  <span className="font-medium">Sale Price:</span> $
                  {formData.salePrice}
                </div>
                <div>
                  <span className="font-medium">List Price:</span> $
                  {formData.listPrice}
                </div>

                <div>
                  <span className="font-medium">Categories:</span>{' '}
                  {formData.categories.join(', ')}
                </div>
                <div>
                  <span className="font-medium">Tags:</span>{' '}
                  {formData.tags.join(', ') || 'None'}
                </div>
                <div>
                  <span className="font-medium">Coupon Type:</span>{' '}
                  {formData.couponType}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 ">
            <Button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
              className="px-6  border-border-default"
            >
              Previous
            </Button>

            {currentStep < steps.length ? (
              <Button
                type="button"
                onClick={nextStep}
                className="px-6 bg-primary hover:bg-green-700 text-white"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                className="px-6 bg-primary hover:bg-green-700 text-white"
              >
                Submit Deal
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
