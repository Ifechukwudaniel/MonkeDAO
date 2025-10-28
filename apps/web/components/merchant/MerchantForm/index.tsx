/* ╔════════════════════════════════════════════╗
   ║ FILE: MerchantForm.tsx
   ║ DESC: Merchant Onboarding Form Component
   ║ CONTRIBUTOR: Open Source
   ╚════════════════════════════════════════════╝ */
'use client';

import { Button } from '@monkedeals/ui/components/button';
import { Checkbox } from '@monkedeals/ui/components/checkbox';
import { Input } from '@monkedeals/ui/components/input';
import { Label } from '@monkedeals/ui/components/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@monkedeals/ui/components/select';
import { useState } from 'react';

/* ╔════════════════════════════════════════════╗
   ║ ⬢ MerchantForm Component
   ╚════════════════════════════════════════════╝ */
export default function MerchantForm() {
  const [form, setForm] = useState({
    businessName: '',
    businessAddress: '',
    contactName: '',
    email: '',
    website: '',
    category: '',
    agree: false,
  });

  // ⚙️ Handlers
  // =====================================
  const handleChange = (key: string, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.agree) return alert('You must agree to the terms');
    console.log('Submitted:', form);
    // 💭 we send this onchain and to backend
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white/5 backdrop-blur-sm border border-border-default rounded p-6 ">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Merchant Onboarding
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Business Name */}
        <div>
          <Label className="text-sm mb-1">Business Name</Label>
          <Input
            placeholder="e.g. Moutai Marketplace"
            value={form.businessName}
            onChange={(e) => handleChange('businessName', e.target.value)}
            required
          />
        </div>

        {/* Business Address */}
        <div>
          <Label className=" text-sm mb-1">Business Address</Label>
          <Input
            placeholder="e.g. 42 Banana Island, Lagos"
            value={form.businessAddress}
            onChange={(e) => handleChange('businessAddress', e.target.value)}
            required
          />
        </div>

        {/* Contact Name */}
        <div>
          <Label className=" text-sm mb-1">Contact Name</Label>
          <Input
            placeholder="e.g. Si Obi"
            value={form.contactName}
            onChange={(e) => handleChange('contactName', e.target.value)}
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label className=" text-sm mb-1">Email Address</Label>
          <Input
            type="email"
            placeholder="e.g. team@moutai.io"
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
            required
          />
        </div>

        {/* Website / Social */}
        <div>
          <Label className=" text-sm mb-1">Website / Social Handle</Label>
          <Input
            placeholder="e.g. https://moutai.io or @moutaiofficial"
            value={form.website}
            onChange={(e) => handleChange('website', e.target.value)}
          />
        </div>

        {/* Category */}
        <div>
          <Label className=" text-sm mb-1">Business Category</Label>
          <Select
            onValueChange={(value) => handleChange('category', value)}
            value={form.category}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="retail">Retail / eCommerce</SelectItem>
              <SelectItem value="nft">NFT / Digital Goods</SelectItem>
              <SelectItem value="events">Events / Experiences</SelectItem>
              <SelectItem value="services">Professional Services</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Agree to terms */}
        <div className="flex items-center gap-2 mt-3">
          <Checkbox
            checked={form.agree}
            onCheckedChange={(checked) =>
              handleChange('agree', Boolean(checked))
            }
            id="agree"
          />
          <Label htmlFor="agree" className="text-xs text-gray-400">
            I agree to the{' '}
            <span className="text-green-400 cursor-pointer">Terms of Use</span>{' '}
            and have read the{' '}
            <span className="text-green-400 cursor-pointer">
              Privacy Policy
            </span>
            .
          </Label>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="mt-4 bg-primary hover:bg-[#3e7a4e] w-full text-sm uppercase font-semibold text-white "
        >
          Register Merchant
        </Button>
      </form>
    </div>
  );
}
