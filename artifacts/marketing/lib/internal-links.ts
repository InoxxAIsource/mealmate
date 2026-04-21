export interface InternalLink {
  title?: string;
  url: string;
  anchor: string;
}

export const linkGraph: Record<string, InternalLink[]> = {
  "/": [
    {
      title: "PCOS Meal Plan",
      url: "/pcos-meal-plan",
      anchor: "Personalised PCOS meal plans for Indian women",
    },
    {
      title: "Diabetic Meal Plan",
      url: "/diabetes-meal-plan",
      anchor: "Low-GI Indian meal plans for diabetes management",
    },
    {
      title: "Pregnancy Nutrition",
      url: "/pregnancy-meal-plan",
      anchor: "Trimester-wise pregnancy meal plans with Indian food",
    },
    {
      title: "Thyroid Diet Plan",
      url: "/thyroid-diet-plan",
      anchor: "Thyroid-friendly Indian diet with selenium-rich foods",
    },
    {
      title: "How It Works",
      url: "/how-it-works",
      anchor: "How MealCoreAI builds your personalised meal plan",
    },
    {
      title: "Blog",
      url: "/blog",
      anchor: "Indian nutrition guides and condition-specific meal plan articles",
    },
  ],

  "/pcos-meal-plan": [
    {
      url: "/meal-plans/pcos-weekly-meal-plan-south-indian",
      anchor: "South Indian PCOS weekly meal plan with millet-based recipes",
    },
    {
      url: "/meal-plans/pcos-breakfast-ideas-north-indian",
      anchor: "North Indian PCOS breakfast ideas to balance hormones",
    },
    {
      url: "/meal-plans/pcos-7-day-meal-plan-gujarati",
      anchor: "Gujarati 7-day PCOS meal plan with low-GI dishes",
    },
    {
      url: "/blog/pcos-diet-plan-india",
      anchor: "Complete PCOS diet guide for Indian women",
    },
    {
      url: "/blog/millet-benefits-pcos",
      anchor: "Why millets like ragi and bajra help with PCOS",
    },
    {
      url: "/diabetes-meal-plan",
      anchor: "Diabetic meal plans for insulin resistance",
    },
    {
      url: "/thyroid-diet-plan",
      anchor: "Thyroid diet plan for hormonal balance",
    },
    {
      url: "/cholesterol-diet-plan",
      anchor: "Cholesterol-friendly meal plans for heart health",
    },
  ],

  "/diabetes-meal-plan": [
    {
      url: "/meal-plans/diabetes-weekly-meal-plan-south-indian",
      anchor: "South Indian diabetic weekly meal plan with low-GI staples",
    },
    {
      url: "/meal-plans/diabetes-breakfast-ideas-north-indian",
      anchor: "North Indian diabetic breakfast ideas to control blood sugar",
    },
    {
      url: "/blog/diabetic-indian-breakfast-ideas",
      anchor: "25 diabetic-friendly Indian breakfast ideas",
    },
    {
      url: "/blog/ragi-benefits-diabetes",
      anchor: "How ragi helps control blood sugar naturally",
    },
    {
      url: "/blog/low-gi-indian-foods-list",
      anchor: "Complete low-GI Indian foods list for diabetics",
    },
    {
      url: "/pcos-meal-plan",
      anchor: "PCOS meal plans for insulin resistance",
    },
    {
      url: "/cholesterol-diet-plan",
      anchor: "Cholesterol-friendly meal plans for diabetic heart health",
    },
  ],

  "/thyroid-diet-plan": [
    {
      url: "/meal-plans/thyroid-weekly-meal-plan-north-indian",
      anchor: "North Indian thyroid-friendly weekly meal plan",
    },
    {
      url: "/blog/thyroid-foods-avoid-india",
      anchor: "Foods to avoid with thyroid — Indian diet guide",
    },
    {
      url: "/blog/thyroid-weight-gain-diet",
      anchor: "Managing thyroid weight gain with an Indian diet",
    },
    {
      url: "/pcos-meal-plan",
      anchor: "PCOS meal plans for hormonal imbalance",
    },
    {
      url: "/cholesterol-diet-plan",
      anchor: "Cholesterol diet plan for thyroid-related heart risks",
    },
  ],

  "/pregnancy-meal-plan": [
    {
      url: "/meal-plans/pregnancy-7-day-meal-plan-north-indian",
      anchor: "North Indian pregnancy 7-day meal plan trimester-wise",
    },
    {
      url: "/blog/pregnancy-nutrition-first-trimester",
      anchor: "First trimester nutrition guide for Indian mothers",
    },
    {
      url: "/blog/iron-rich-foods-pregnancy-india",
      anchor: "30 iron-rich Indian foods for pregnancy anaemia",
    },
    {
      url: "/blog/pregnancy-foods-to-avoid",
      anchor: "Foods to avoid during pregnancy — complete Indian guide",
    },
    {
      url: "/kids-meal-plan",
      anchor: "Kids meal plans for healthy growth after birth",
    },
  ],

  "/kids-meal-plan": [
    {
      url: "/meal-plans/kids-lunch-ideas-north-indian",
      anchor: "North Indian kids lunch ideas for healthy school tiffins",
    },
    {
      url: "/blog/kids-healthy-tiffin-ideas",
      anchor: "30 healthy tiffin box ideas for Indian kids",
    },
    {
      url: "/blog/kids-calcium-foods-india",
      anchor: "Calcium-rich Indian foods for growing kids",
    },
    {
      url: "/blog/kids-fussy-eater-meal-ideas",
      anchor: "Meal ideas for fussy eaters — Indian parents guide",
    },
    {
      url: "/pregnancy-meal-plan",
      anchor: "Pregnancy nutrition plans for new mothers",
    },
  ],

  "/cholesterol-diet-plan": [
    {
      url: "/meal-plans/cholesterol-weekly-meal-plan-south-indian",
      anchor: "South Indian cholesterol-friendly weekly meal plan",
    },
    {
      url: "/blog/cholesterol-lowering-indian-foods",
      anchor: "20 Indian foods that naturally lower cholesterol",
    },
    {
      url: "/diabetes-meal-plan",
      anchor: "Diabetic meal plans for heart-health management",
    },
    {
      url: "/thyroid-diet-plan",
      anchor: "Thyroid diet plan for metabolic health",
    },
  ],

  "/blog": [
    { url: "/pcos-meal-plan", anchor: "Personalised PCOS meal plans for Indian women" },
    { url: "/diabetes-meal-plan", anchor: "Diabetic Indian meal plans with low-GI foods" },
    { url: "/pregnancy-meal-plan", anchor: "Pregnancy nutrition plans trimester-wise" },
    { url: "/kids-meal-plan", anchor: "Healthy kids meal plans and tiffin ideas" },
    { url: "/how-it-works", anchor: "How MealCoreAI personalises your meal plan" },
  ],

  "/how-it-works": [
    { url: "/pcos-meal-plan", anchor: "PCOS personalised meal plans" },
    { url: "/diabetes-meal-plan", anchor: "Diabetic meal plans with AI personalisation" },
    { url: "/pricing", anchor: "Free and Pro meal planning plans" },
    { url: "/faq", anchor: "Frequently asked questions about MealCoreAI" },
    { url: "/blog", anchor: "Indian nutrition and meal planning articles" },
  ],

  "/pricing": [
    { url: "/how-it-works", anchor: "How MealCoreAI works before you sign up" },
    { url: "/faq", anchor: "Frequently asked questions about pricing and plans" },
    { url: "/pcos-meal-plan", anchor: "PCOS meal plans included in all plans" },
    { url: "/diabetes-meal-plan", anchor: "Diabetic meal plans for every track" },
  ],

  "/faq": [
    { url: "/how-it-works", anchor: "Full breakdown of how MealCoreAI builds your plan" },
    { url: "/pricing", anchor: "Free vs Pro plan comparison" },
    { url: "/pcos-meal-plan", anchor: "PCOS meal planning with AI" },
    { url: "/blog", anchor: "Indian nutrition guides and health articles" },
  ],

  "/about": [
    { url: "/how-it-works", anchor: "How MealCoreAI builds personalised meal plans" },
    { url: "/blog", anchor: "Our nutrition guides and research-backed articles" },
    { url: "/pcos-meal-plan", anchor: "PCOS meal plans — our most popular track" },
    { url: "/pricing", anchor: "Free and Pro plan options" },
  ],

  "/blog/pcos-diet-plan-india": [
    { url: "/pcos-meal-plan", anchor: "Get a personalised PCOS meal plan with Indian food" },
    { url: "/blog/millet-benefits-pcos", anchor: "Why millets like ragi and bajra help PCOS" },
    { url: "/blog/pcos-breakfast-ideas-indian", anchor: "Best Indian breakfast ideas for PCOS" },
    { url: "/blog/pcos-insulin-resistance-diet", anchor: "Beating insulin resistance with Indian food" },
    { url: "/meal-plans/pcos-weekly-meal-plan-south-indian", anchor: "South Indian PCOS weekly meal plan" },
  ],

  "/blog/millet-benefits-pcos": [
    { url: "/pcos-meal-plan", anchor: "Personalised PCOS meal plan with millet-based recipes" },
    { url: "/blog/pcos-diet-plan-india", anchor: "Complete PCOS diet guide for Indian women" },
    { url: "/blog/pcos-breakfast-ideas-indian", anchor: "Millet-based Indian breakfasts for PCOS" },
    { url: "/meal-plans/pcos-breakfast-ideas-north-indian", anchor: "North Indian PCOS breakfast ideas" },
  ],

  "/blog/pcos-breakfast-ideas-indian": [
    { url: "/pcos-meal-plan", anchor: "Full personalised PCOS meal plan" },
    { url: "/blog/pcos-diet-plan-india", anchor: "Complete PCOS diet guide" },
    { url: "/blog/millet-benefits-pcos", anchor: "Why millets are ideal for PCOS" },
    { url: "/meal-plans/pcos-weekly-meal-plan-south-indian", anchor: "PCOS weekly meal plan South Indian style" },
  ],

  "/blog/pcos-insulin-resistance-diet": [
    { url: "/pcos-meal-plan", anchor: "Personalised Indian PCOS meal plan" },
    { url: "/blog/pcos-diet-plan-india", anchor: "PCOS diet guide for Indian women" },
    { url: "/diabetes-meal-plan", anchor: "Diabetic meal plans for insulin management" },
    { url: "/blog/low-gi-indian-foods-list", anchor: "Complete low-GI Indian foods list" },
  ],

  "/blog/diabetic-indian-breakfast-ideas": [
    { url: "/diabetes-meal-plan", anchor: "Full personalised diabetic meal plan" },
    { url: "/blog/ragi-benefits-diabetes", anchor: "How ragi controls blood sugar" },
    { url: "/blog/low-gi-indian-foods-list", anchor: "Low-GI Indian foods for diabetics" },
    { url: "/meal-plans/diabetes-breakfast-ideas-north-indian", anchor: "North Indian diabetic breakfast ideas" },
  ],

  "/blog/ragi-benefits-diabetes": [
    { url: "/diabetes-meal-plan", anchor: "Personalised diabetic meal plan with ragi recipes" },
    { url: "/blog/diabetic-indian-breakfast-ideas", anchor: "25 diabetic-friendly Indian breakfasts" },
    { url: "/blog/low-gi-indian-foods-list", anchor: "Complete low-GI Indian foods list" },
    { url: "/meal-plans/diabetes-weekly-meal-plan-south-indian", anchor: "South Indian diabetic weekly meal plan" },
  ],

  "/blog/low-gi-indian-foods-list": [
    { url: "/diabetes-meal-plan", anchor: "Diabetic meal plans based on low-GI Indian foods" },
    { url: "/pcos-meal-plan", anchor: "PCOS meal plans with low-GI Indian ingredients" },
    { url: "/blog/ragi-benefits-diabetes", anchor: "Why ragi is the best low-GI grain for diabetes" },
    { url: "/blog/diabetic-indian-breakfast-ideas", anchor: "Diabetic breakfast ideas using low-GI foods" },
  ],

  "/blog/gestational-diabetes-meal-plan": [
    { url: "/diabetes-meal-plan", anchor: "Diabetic meal plans for blood sugar control" },
    { url: "/pregnancy-meal-plan", anchor: "Pregnancy nutrition plans trimester-wise" },
    { url: "/blog/pregnancy-nutrition-first-trimester", anchor: "First trimester nutrition guide" },
    { url: "/blog/low-gi-indian-foods-list", anchor: "Low-GI Indian foods safe in pregnancy" },
  ],

  "/blog/thyroid-foods-avoid-india": [
    { url: "/thyroid-diet-plan", anchor: "Complete personalised thyroid diet plan" },
    { url: "/blog/thyroid-weight-gain-diet", anchor: "Managing thyroid weight gain with Indian food" },
    { url: "/pcos-meal-plan", anchor: "PCOS meal plans for hormonal balance" },
  ],

  "/blog/thyroid-weight-gain-diet": [
    { url: "/thyroid-diet-plan", anchor: "Personalised thyroid diet plan" },
    { url: "/blog/thyroid-foods-avoid-india", anchor: "Foods to avoid with thyroid in India" },
    { url: "/cholesterol-diet-plan", anchor: "Cholesterol-friendly meal plan for metabolic health" },
    { url: "/meal-plans/thyroid-weekly-meal-plan-north-indian", anchor: "North Indian thyroid weekly meal plan" },
  ],

  "/blog/pregnancy-nutrition-first-trimester": [
    { url: "/pregnancy-meal-plan", anchor: "Full trimester-wise pregnancy meal plan" },
    { url: "/blog/iron-rich-foods-pregnancy-india", anchor: "Iron-rich Indian foods for pregnancy anaemia" },
    { url: "/blog/pregnancy-foods-to-avoid", anchor: "Foods to avoid during pregnancy" },
    { url: "/meal-plans/pregnancy-7-day-meal-plan-north-indian", anchor: "North Indian pregnancy 7-day meal plan" },
  ],

  "/blog/iron-rich-foods-pregnancy-india": [
    { url: "/pregnancy-meal-plan", anchor: "Personalised Indian pregnancy meal plan" },
    { url: "/blog/pregnancy-nutrition-first-trimester", anchor: "First trimester nutrition guide" },
    { url: "/blog/pregnancy-foods-to-avoid", anchor: "Foods to avoid during pregnancy" },
    { url: "/kids-meal-plan", anchor: "Kids nutrition plans for healthy growth" },
  ],

  "/blog/pregnancy-foods-to-avoid": [
    { url: "/pregnancy-meal-plan", anchor: "Safe and personalised pregnancy meal plan" },
    { url: "/blog/pregnancy-nutrition-first-trimester", anchor: "First trimester nutrition guide" },
    { url: "/blog/iron-rich-foods-pregnancy-india", anchor: "30 iron-rich foods safe in pregnancy" },
    { url: "/kids-meal-plan", anchor: "Kids meal plans for post-pregnancy nutrition" },
  ],

  "/blog/kids-healthy-tiffin-ideas": [
    { url: "/kids-meal-plan", anchor: "Personalised kids meal plan with healthy tiffin options" },
    { url: "/blog/kids-calcium-foods-india", anchor: "Calcium-rich Indian foods for growing kids" },
    { url: "/blog/kids-fussy-eater-meal-ideas", anchor: "Meal ideas for fussy eaters" },
    { url: "/pregnancy-meal-plan", anchor: "Pregnancy nutrition plans for new mothers" },
  ],

  "/blog/kids-calcium-foods-india": [
    { url: "/kids-meal-plan", anchor: "Personalised kids meal plan with calcium-rich dishes" },
    { url: "/blog/kids-healthy-tiffin-ideas", anchor: "Healthy tiffin ideas with calcium-rich foods" },
    { url: "/blog/kids-fussy-eater-meal-ideas", anchor: "Calcium-rich meals even fussy eaters love" },
  ],

  "/blog/kids-fussy-eater-meal-ideas": [
    { url: "/kids-meal-plan", anchor: "Personalised meal plan for fussy-eater kids" },
    { url: "/blog/kids-healthy-tiffin-ideas", anchor: "30 healthy tiffin ideas for Indian kids" },
    { url: "/blog/kids-calcium-foods-india", anchor: "Calcium-rich foods disguised as tasty meals" },
  ],

  "/blog/cholesterol-lowering-indian-foods": [
    { url: "/cholesterol-diet-plan", anchor: "Full personalised cholesterol-friendly meal plan" },
    { url: "/diabetes-meal-plan", anchor: "Diabetic meal plans for heart health" },
    { url: "/meal-plans/cholesterol-weekly-meal-plan-south-indian", anchor: "South Indian cholesterol-friendly weekly meal plan" },
  ],

  "/blog/south-indian-diet-weight-loss": [
    { url: "/diabetes-meal-plan", anchor: "Diabetic meal plans with South Indian recipes" },
    { url: "/cholesterol-diet-plan", anchor: "Heart-healthy South Indian meal plans" },
    { url: "/blog/low-gi-indian-foods-list", anchor: "Low-GI Indian foods for sustainable weight loss" },
    { url: "/how-it-works", anchor: "How MealCoreAI personalises your weight-loss plan" },
  ],

  "/blog/meal-planning-beginners-india": [
    { url: "/how-it-works", anchor: "How MealCoreAI automates Indian meal planning" },
    { url: "/pcos-meal-plan", anchor: "Beginner-friendly PCOS meal plans" },
    { url: "/diabetes-meal-plan", anchor: "Easy diabetic meal plans to get started" },
    { url: "/blog", anchor: "All Indian nutrition and meal planning articles" },
  ],

  "/blog/ai-meal-planning-personalised-nutrition": [
    { url: "/how-it-works", anchor: "How MealCoreAI's AI builds your meal plan" },
    { url: "/pcos-meal-plan", anchor: "AI-personalised PCOS meal plans" },
    { url: "/diabetes-meal-plan", anchor: "AI-personalised diabetic meal plans" },
    { url: "/pricing", anchor: "Start free with AI-powered meal planning" },
  ],
};

export function getRelatedLinks(path: string): InternalLink[] {
  return linkGraph[path] ?? [];
}
