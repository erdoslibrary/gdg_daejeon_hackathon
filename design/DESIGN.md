---
name: Kitchen Harmony
colors:
  surface: '#fff8f3'
  surface-dim: '#e1d9cf'
  surface-bright: '#fff8f3'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#fbf2e8'
  surface-container: '#f6ece3'
  surface-container-high: '#f0e7dd'
  surface-container-highest: '#eae1d7'
  on-surface: '#1f1b15'
  on-surface-variant: '#46483b'
  inverse-surface: '#343029'
  inverse-on-surface: '#f8efe5'
  outline: '#767869'
  outline-variant: '#c6c8b6'
  surface-tint: '#54651e'
  primary: '#52621c'
  on-primary: '#ffffff'
  primary-container: '#6a7c32'
  on-primary-container: '#fbffe4'
  inverse-primary: '#bbcf7c'
  secondary: '#8a4f32'
  on-secondary: '#ffffff'
  secondary-container: '#ffb28e'
  on-secondary-container: '#794226'
  tertiary: '#795437'
  on-tertiary: '#ffffff'
  tertiary-container: '#956c4d'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d7ec95'
  primary-fixed-dim: '#bbcf7c'
  on-primary-fixed: '#161e00'
  on-primary-fixed-variant: '#3d4c05'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb694'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#6d381d'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#efbc98'
  on-tertiary-fixed: '#2f1501'
  on-tertiary-fixed-variant: '#613f24'
  background: '#fff8f3'
  on-background: '#1f1b15'
  surface-variant: '#eae1d7'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: '1.3'
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Nunito Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Nunito Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '700'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style

The design system is centered around the concept of "Digital Warmth." It aims to bridge the gap between the solitary nature of single-person households and the communal joy of cooking. The visual language is **Modern & Lean**, utilizing a high degree of whitespace to ensure the interface feels breathable and easy to navigate during active cooking sessions.

The aesthetic leans into a **Tactile Minimalism**. It avoids the coldness of traditional tech platforms by using organic, earthy tones and soft, inviting shapes. The emotional goal is to evoke the feeling of a sun-drenched morning kitchen—organized yet cozy, professional yet approachable. By combining "home-made" textures with "high-tech" interactions, this design system creates a space where users feel both competent in their cooking and connected to their community.

## Colors

The palette for this design system is rooted in the natural world. **Warm Olive** serves as the primary brand color, representing health and fresh ingredients. **Soft Apricot** acts as the secondary color, used to highlight interactive elements and stimulate appetite.

The background uses a **Creamy Off-White** to significantly reduce eye fatigue compared to pure white, especially important for users following recipes or watching live streams for extended periods. Accents are strictly **Earthy Tones**—deep browns and muted ochres—which replace traditional blacks and grays to maintain the "home cooking" vibe. Functional colors (success, warning, error) should be slightly desaturated to remain harmonious with the warm olive base.

## Typography

Typography in this design system prioritizes legibility at a distance, as users may be viewing their screens while standing at a kitchen counter. 

**Plus Jakarta Sans** is used for headlines and labels. Its modern, geometric yet friendly curves provide the "touch of playfulness" required. For long-form content and recipe instructions, **Nunito Sans** is employed; its rounded terminals complement the overall shape language of the UI and ensure a gentle reading experience. 

Line heights are intentionally generous to accommodate quick scanning, and font weights are kept slightly heavier to ensure high contrast against the creamy background.

## Layout & Spacing

This design system utilizes a **Fixed Grid** for desktop (12 columns) and a **Fluid Grid** for mobile devices (4 columns). The spacing rhythm is based on an 8px baseline, ensuring consistent alignment across all components.

To emphasize the "Lean" aesthetic, margins and gutters are wider than industry standard, creating significant "negative space" that directs the user's focus toward the content—primarily the live video and recipe cards. On mobile, padding is increased around interactive elements to ensure they are "kitchen-friendly" (easy to tap with messy or wet fingers).

## Elevation & Depth

Hierarchy is established through **Ambient Shadows** and **Tonal Layering**. Instead of harsh, black shadows, this design system uses soft, diffused shadows tinted with a hint of the primary olive or tertiary brown. This makes the elements appear as if they are resting on a wooden table rather than floating in digital space.

Three levels of depth are defined:
1.  **Base:** The creamy off-white background.
2.  **Surface:** Cards and secondary containers using a subtle 1px border (#E8E4D8) and a very soft, long-spread shadow.
3.  **Overlay:** Modals, chat bubbles, and tooltips using a more pronounced shadow to indicate immediate priority.

Glassmorphism is applied sparingly, specifically within the Live Chat interface, to allow the video content to bleed through the UI subtly, maintaining a sense of immersion.

## Shapes

The shape language is defined by a **Large Radius** philosophy. Hard corners are strictly avoided to maintain the friendly, approachable brand voice. 

- Standard components (Inputs, Chips) use a **0.5rem (8px)** radius.
- Container elements (Cards, Modals) use a **1rem (16px)** radius.
- Primary buttons and Badge-style tags utilize **Pill-shapes (full rounding)** to feel tactile and "squishy."

This softness in the corners mimics the organic shapes of kitchenware and ingredients, further reinforcing the home cooking theme.

## Components

### Buttons & Interaction
Buttons are large and highly visible. The Primary Button uses the **Warm Olive** fill with a subtle "inner glow" effect. **Interactive Status Buttons** (e.g., "Ready to Cook") feature a continuous border animation—a soft, pulsing line that rotates around the perimeter to indicate an active or waiting state.

### Cards
Cards are the primary content vessel. They feature a white background, a 16px corner radius, and a low-opacity shadow. On hover, cards should lift slightly (3-5px translation) to provide tactile feedback.

### Badge-style Tags
Ingredient tags use a Soft Apricot background with a slightly darker text color. These are pill-shaped and include a small organic icon (e.g., a leaf or a drop) to provide visual context at a glance.

### Live Chat Interface
Inspired by YouTube Live, the chat resides in a semi-transparent panel. Chat bubbles use a low-contrast "cream-on-cream" style with the user's name highlighted in the Primary Olive. System messages (e.g., "New Chef joined!") are centered and use an italicized Soft Apricot font.

### Progress Indicators
Step-by-step instructions use a custom circular progress bar with a "hand-drawn" stroke quality, reinforcing the friendly, non-industrial nature of this design system.