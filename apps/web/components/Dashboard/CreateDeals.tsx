'use client';

import { Badge } from '@monkedeals/ui/components/badge';
import { Button } from '@monkedeals/ui/components/button';
import { Card, CardContent, CardHeader } from '@monkedeals/ui/components/card';
import { Input } from '@monkedeals/ui/components/input';
import { Label } from '@monkedeals/ui/components/label';
import React, { useState } from 'react';
import { TiptapEditor } from './TipTapEditor';

// -------------- Types --------------
interface DealFormData {
  dealUrl: string;
  dealTitle: string;
  salePrice: string;
  listPrice: string;
  description: string;
  categories: string[];
  stores: string[];
  brands: string[];
  couponType: string;
  merchantWallet: string;
  images: File[];
}

const COUPON_TYPES = [
  'Discount Code',
  'Cashback',
  'BOGO (Buy One Get One)',
  'Free Shipping',
  'NFT Reward',
];

// -------------- Component --------------
export const CreateDealForm: React.FC = () => {
  const [formData, setFormData] = useState<DealFormData>({
    dealUrl: '',
    dealTitle: '',
    salePrice: '',
    listPrice: '',
    description: '',
    categories: [],
    stores: [],
    brands: [],
    couponType: COUPON_TYPES[0],
    merchantWallet: '', // from wallet kit later
    images: [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({
        ...prev,
        images: Array.from(e.target.files),
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Deal Data:', formData);
    // TODO: integrate with backend or NFT mint logic
  };

  return (
    <Card className="max-w-2xl mx-auto border border-[#C4C4C4] rounded-none">
      <CardHeader>
        <h2 className="text-3xl font-semibold">Share a Deal or Coupon</h2>
        <p className="text-sm text-gray-500">
          Want to post a great deal? Keep your title clear and include price,
          store, and perks!
        </p>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="dealUrl">Deal URL</Label>
            <Input
              id="dealUrl"
              name="dealUrl"
              value={formData.dealUrl}
              onChange={handleChange}
              placeholder="https://..."
              className=" focus:ring-green-500"
            />
          </div>

          {/* Deal Title */}
          <div>
            <Label htmlFor="dealTitle">Deal Title *</Label>
            <Input
              id="dealTitle"
              name="dealTitle"
              value={formData.dealTitle}
              onChange={handleChange}
              required
              placeholder='e.g. "65” TCL QLED 4K TV + Free Shipping $549"'
              className=" focus:ring-green-500"
            />
          </div>

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="salePrice">Sale Price</Label>
              <Input
                id="salePrice"
                name="salePrice"
                type="number"
                value={formData.salePrice}
                onChange={handleChange}
                placeholder="$549"
                className=" focus:ring-green-500"
              />
            </div>
            <div>
              <Label htmlFor="listPrice">List Price</Label>
              <Input
                id="listPrice"
                name="listPrice"
                type="number"
                value={formData.listPrice}
                onChange={handleChange}
                placeholder="$799"
                className=" focus:ring-green-500"
              />
            </div>
          </div>

          {/* Coupon Type */}
          <div>
            <Label htmlFor="couponType">Coupon Type</Label>
            <select
              id="couponType"
              name="couponType"
              value={formData.couponType}
              onChange={handleChange}
              className="w-full border  rounded-md p-2 focus:ring-green-500"
            >
              {COUPON_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <TiptapEditor
              initialMarkdown={formData.description}
              onChange={(md) => {
                handleChange;
              }}
            />
          </div>

          {/* Categories, Stores, Brands */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TagInput
              label="Categories *"
              name="categories"
              tags={formData.categories}
              setFormData={setFormData}
            />
            <TagInput
              label="Stores"
              name="stores"
              tags={formData.stores}
              setFormData={setFormData}
            />
            <TagInput
              label="Brands"
              name="brands"
              tags={formData.brands}
              setFormData={setFormData}
            />
          </div>

          {/* File Upload */}
          <div>
            <Label htmlFor="images">Images & Attachments</Label>
            <Input
              id="images"
              name="images"
              type="file"
              multiple
              onChange={handleFileChange}
              className=" focus:ring-green-500"
            />
            <div className="flex gap-2 mt-2 flex-wrap">
              {formData.images.map((file, i) => (
                <Badge key={i} className="bg-green-100 text-green-700 ">
                  {file.name}
                </Badge>
              ))}
            </div>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            Post Deal
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

// -------------- Tag Input (mini component) --------------
interface TagInputProps {
  label: string;
  name: keyof DealFormData;
  tags: string[];
  setFormData: React.Dispatch<React.SetStateAction<DealFormData>>;
}

const TagInput: React.FC<TagInputProps> = ({
  label,
  name,
  tags,
  setFormData,
}) => {
  const [input, setInput] = useState('');

  const addTag = () => {
    if (input.trim() && !tags.includes(input.trim())) {
      setFormData((prev) => ({
        ...prev,
        [name]: [...(prev[name] as string[]), input.trim()],
      }));
      setInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: (prev[name] as string[]).filter((t) => t !== tag),
    }));
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1 flex-wrap">
        {tags.map((tag) => (
          <Badge
            key={tag}
            onClick={() => removeTag(tag)}
            className="cursor-pointer bg-green-100 text-green-700 border-green-300 hover:bg-green-200"
          >
            {tag} ✕
          </Badge>
        ))}
      </div>
      <div className="flex gap-2 mt-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add..."
          className=" focus:ring-green-500"
        />
        <Button
          type="button"
          onClick={addTag}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          Add
        </Button>
      </div>
    </div>
  );
};
