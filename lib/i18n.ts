export type Locale = "en" | "zh";

export const translations: Record<string, Record<Locale, string>> = {
  // Header
  "header.tagline": { en: "AI-powered marketing copy in seconds", zh: "AI驱动的营销文案，秒速生成" },
  "lang.toggle": { en: "Switch to Chinese", zh: "切换到英文" },

  // InputForm labels
  "input.productName": { en: "Product / Service Name", zh: "产品/服务名称" },
  "input.productName.placeholder": { en: "e.g. AdCopyGen", zh: "例如：AdCopyGen" },
  "input.description": { en: "Short Description", zh: "简短描述" },
  "input.description.placeholder": { en: "What does it do? What problem does it solve?", zh: "它做什么？解决什么问题？" },
  "input.targetAudience": { en: "Target Audience", zh: "目标受众" },
  "input.targetAudience.placeholder": { en: "e.g. SaaS founders, busy moms", zh: "例如：SaaS创始人、忙碌的妈妈" },
  "input.tone": { en: "Tone of Voice", zh: "语调风格" },
  "input.copyType": { en: "Copy Type", zh: "文案类型" },
  "input.keyBenefits": { en: "Key Benefits / USPs", zh: "核心卖点/USP" },
  "input.keyBenefits.placeholder": { en: "Enter key selling points...", zh: "输入核心卖点..." },
  "input.competitor": { en: "Competitor / Differentiation", zh: "竞争对手/差异化" },
  "input.competitor.placeholder": { en: "What makes this different?", zh: "有什么不同？" },
  "input.charLimit": { en: "Character Limit", zh: "字数限制" },
  "input.charLimit.placeholder": { en: "e.g. 150 for tweets", zh: "例如：150（推文）" },
  "input.variations": { en: "Number of Variations", zh: "变体数量" },
  "input.optional": { en: "(optional)", zh: "（可选）" },
  "input.generate": { en: "Generate Copy", zh: "生成文案" },
  "input.generating": { en: "Generating...", zh: "生成中..." },

  // CopyType labels
  "copyType.ad-headlines": { en: "Ad Headlines", zh: "广告标题" },
  "copyType.ad-headlines.desc": { en: "Google/Meta Ads", zh: "谷歌/Meta广告" },
  "copyType.email-subject-lines": { en: "Email Subject Lines", zh: "邮件主题" },
  "copyType.email-subject-lines.desc": { en: "Inbox openers", zh: "邮件开头" },
  "copyType.social-media-posts": { en: "Social Media Posts", zh: "社交媒体帖子" },
  "copyType.social-media-posts.desc": { en: "Instagram/Twitter/LinkedIn", zh: "Instagram/Twitter/LinkedIn" },
  "copyType.product-descriptions": { en: "Product Descriptions", zh: "产品描述" },
  "copyType.product-descriptions.desc": { en: "E-commerce & landing pages", zh: "电商与落地页" },
  "copyType.cta-buttons": { en: "Call-to-Action", zh: "行动号召" },
  "copyType.cta-buttons.desc": { en: "CTA buttons", zh: "CTA按钮" },
  "copyType.taglines-slogans": { en: "Taglines & Slogans", zh: "标语与口号" },
  "copyType.taglines-slogans.desc": { en: "Brand messaging", zh: "品牌信息" },
  "copyType.blog-post-titles": { en: "Blog Post Titles", zh: "博客标题" },
  "copyType.blog-post-titles.desc": { en: "Content marketing", zh: "内容营销" },
  "copyType.video-script-hooks": { en: "Video Script Hooks", zh: "视频脚本开头" },
  "copyType.video-script-hooks.desc": { en: "First 5 seconds", zh: "前5秒" },

  // Tone labels
  "tone.professional": { en: "Professional", zh: "专业" },
  "tone.casual-friendly": { en: "Casual & Friendly", zh: "轻松友好" },
  "tone.bold-provocative": { en: "Bold & Provocative", zh: "大胆犀利" },
  "tone.witty-humorous": { en: "Witty & Humorous", zh: "风趣幽默" },
  "tone.luxurious-premium": { en: "Luxurious & Premium", zh: "奢华高端" },
  "tone.urgent-action": { en: "Urgent & Action-Oriented", zh: "紧迫行动" },
  "tone.inspirational": { en: "Inspirational", zh: "鼓舞人心" },
  "tone.conversational": { en: "Conversational", zh: "对话式" },
  "tone.placeholder": { en: "Select a tone...", zh: "选择语调..." },

  // Framework
  "framework.title": { en: "Copywriting Framework", zh: "文案框架" },
  "framework.optional": { en: "(Optional)", zh: "（可选）" },
  "framework.aida.desc": { en: "Attention → Interest → Desire → Action", zh: "注意 → 兴趣 → 欲望 → 行动" },
  "framework.pas.desc": { en: "Problem → Agitate → Solution", zh: "问题 → 激化 → 解决" },
  "framework.bab.desc": { en: "Before → After → Bridge", zh: "之前 → 之后 → 桥梁" },
  "framework.4us.desc": { en: "Useful, Urgent, Unique, Ultra-specific", zh: "有用、紧迫、独特、超具体" },

  // OutputPanel
  "output.regenerateAll": { en: "Regenerate All", zh: "全部重新生成" },
  "output.generatedCopy": { en: "Generated Copy", zh: "生成的文案" },

  // CopyCard
  "card.copyToClipboard": { en: "Copy to clipboard", zh: "复制到剪贴板" },
  "card.addToFavorites": { en: "Add to favorites", zh: "添加到收藏" },
  "card.removeFromFavorites": { en: "Remove from favorites", zh: "从收藏中移除" },
  "card.regenerate": { en: "Regenerate this copy", zh: "重新生成此文案" },
  "card.chars": { en: "chars", zh: "字符" },

  // EmptyState
  "empty.heading": { en: "Create Copy That Converts", zh: "创作高转化文案" },
  "empty.aiGenerating": { en: "AI generating...", zh: "AI生成中..." },
  "empty.instruction": { en: "Fill in your product details and hit Generate.", zh: "填写产品信息，点击生成。" },
  "empty.sample.0": { en: "Transform your ideas into revenue.", zh: "将创意转化为收入。" },
  "empty.sample.1": { en: "The AI copywriter that never sleeps.", zh: "永不休息的AI文案师。" },
  "empty.sample.2": { en: "Words that sell, powered by intelligence.", zh: "智能驱动，字字卖货。" },
  "empty.sample.3": { en: "Stop writing. Start converting.", zh: "停止写作，开始转化。" },
  "empty.sample.4": { en: "Your brand voice, amplified by AI.", zh: "AI助力，品牌声量倍增。" },

  // FavoritesPanel
  "favorites.title": { en: "Favorites", zh: "收藏夹" },
  "favorites.empty": { en: "No favorites yet", zh: "暂无收藏" },
  "favorites.emptyHint": { en: "Star your best copy to save it here", zh: "星标收藏您最佳的文案" },
  "favorites.copyAll": { en: "Copy All", zh: "复制全部" },
  "favorites.copied": { en: "Copied!", zh: "已复制！" },
  "favorites.clearAll": { en: "Clear All", zh: "清除全部" },
  "favorites.confirmClear": { en: "Are you sure?", zh: "确定清除？" },
  "favorites.close": { en: "Close", zh: "关闭" },
  "favorites.remove": { en: "Remove from favorites", zh: "从收藏中移除" },

  // Toast messages
  "toast.copied": { en: "Copied to clipboard!", zh: "已复制到剪贴板！" },
  "toast.error": { en: "Something went wrong", zh: "出了点问题" },
};
