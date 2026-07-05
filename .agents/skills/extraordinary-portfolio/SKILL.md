---
name: extraordinary-portfolio
description: Technical instructions and design guidelines for building the ultra-creative developer portfolio for Sidy Furtado, inspired by high-end websites like Dennis Snellenberg, Cuberto, and Aristide Benoist.
---

# Instruction for Building Sidy's Extraordinary Developer Portfolio

This skill guides any agent working on Sidy Furtado's developer portfolio to achieve an ultra-premium, interactive, and creative website. The site should combine state-of-the-art WebGL, interactive 3D, custom shaders, and GSAP animations.

---

## 🇧🇷 Idioma e Localização (PT-BR)
- **O site deve ser totalmente em Português do Brasil (PT-BR)**.
- Todos os textos de interface, botões, títulos, descrições de projetos, tags, labels de cursor interativo (ex: "VER", "ARRASTAR", "FECHAR") e metadados SEO devem ser mantidos estritamente em português de forma fluida, moderna e sofisticada.

---


## 🎨 Design Philosophy & References

The project aims to blend and exceed the design languages of three reference websites:

1. **Dennis Snellenberg (dennissnellenberg.com)**:
   - **Characteristics**: Extremely smooth page transitions, magnetic cursors, large editorial typography, elastic hover effects, and a highly polished feel.
   - **Implementation**: GSAP (GreenSock), Lenis/Locomotive Scroll for smooth scrolling, and custom SVG path animations.

2. **Cuberto (cuberto.com)**:
   - **Characteristics**: Liquid canvas effects, interactive cursor overlays (that morph and change shape when hovering over links/projects), fluid physics simulations, and WebGL image grids.
   - **Implementation**: Canvas-based WebGL rendering, custom shaders for image hover distortions, and HTML5 video backgrounds.

3. **Aristide Benoist (aristidebenoist.com)**:
   - **Characteristics**: Artistic art-direction, subtle WebGL scroll-linked image distortions, minimalist color schemes, custom fragment shaders, and high-fidelity typography layouts.
   - **Implementation**: Custom WebGL pipelines, GLSL shaders, and raw/highly-optimized scroll matrix transformations.

---

## 🛠️ Technical Stack & Implementation Guidelines

We recommend **React + Vite** with **TailwindCSS** or **Vanilla CSS** for maximum performance and fast deployment to GitHub Pages.

### 1. Three.js / WebGL / Shaders
- **React Three Fiber (R3F) & @react-three/drei**: Use these to orchestrate the 3D scene.
- **Custom Shaders (GLSL)**:
  - For image hover effects, use a custom fragment shader to create wave distortions or liquid morphs using noise textures (e.g., Simplex or Perlin noise).
  - For interactive 3D elements, use a custom vertex shader to morph abstract geometric shapes (like a floating blob or liquid metal sphere) responsive to cursor coordinates or scroll.
- **Performance**:
  - Keep geometries low-poly.
  - Optimize textures (compress to WebP or use tiny SVG maps).
  - Dispose of geometries and materials on unmount.

### 2. GSAP (GreenSock Animation Platform)
- **ScrollTrigger**: Sync UI text, cards, and section entries to the user's scroll.
- **Custom Cursors**:
  - A custom follower cursor that scales up, morphs, or shows text (e.g., "DRAG" or "VIEW") depending on what the user hovers over.
- **Magnetic Buttons**:
  - Elements that pull the cursor towards them slightly when the cursor is near, using GSAP interpolations.
- **Smooth Scroll**:
  - Use **Lenis** or **Locomotive Scroll** to normalize scrolling behavior and ensure fluid WebGL synchronization.

---

## 📦 Directory Structure Setup

Make sure code is organized inside these directories:
- `src/shaders/`: Houses vertex and fragment shaders (`.vert`, `.frag`, or GLSL strings).
- `src/components/`: Modular interactive components (`CustomCursor`, `Scene3D`, `Magnetic`).
- `src/assets/models/`: Holds 3D `.glb`/`.gltf` assets.
- `src/assets/textures/`: For noise maps, displacement textures, or matcaps.

---

## 💎 Free 3D Assets & Inspiration Sites
When implementing 3D elements, refer to or download assets from:
1. **Poly Pizza** (poly.pizza) - High-quality free low-poly 3D models.
2. **Sketchfab** (sketchfab.com) - Search for Creative Commons/Free 3D models.
3. **Three.js Examples** (threejs.org/examples) - Excellent references for custom materials and procedural shaders.
4. **Shadertoy** (shadertoy.com) - Search for GLSL patterns (noise, liquid, metals) to adapt to Three.js materials.
