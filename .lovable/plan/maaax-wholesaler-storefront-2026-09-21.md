# MAAAX WHOLESALER storefront

## Goal
Build the complete responsive fashion catalog and branch-based ordering experience from the supplied reference, using a premium black, ivory, and muted-gold visual system.

## Foundation
- Establish semantic design tokens, typography, spacing, motion, focus states, and responsive layout rules.
- Create centralized TypeScript data for 24 products, categories, nine editable branch placeholders, imagery, filters, and configuration.
- Add a shared site shell with sticky desktop navigation, mobile menu, search overlay, cart status, and dark footer.

## Shopping experience
- Build the three-slide editorial home page, trust strip, category showcase, new arrivals, collection banners, benefits, and branch finder.
- Build reusable collection pages with desktop sidebar filters, mobile filter panel, sorting, color/size/price/availability controls, and responsive product grids.
- Build the product page with thumbnail gallery, options, availability selection, WhatsApp message generation, and cart actions.
- Keep cart, selected branch, product options, and order details across navigation in browser storage.
- Build cart, customer details, and confirmation screens with validation and polished empty/loading/status states.

## Pages
- Add Home, Men, Women, Kids, New Arrivals, Categories, ten category routes, product detail, Branches, Availability, About, Contact, Cart, Order, Order Success, and the existing custom 404.
- Give every content route unique page titles, descriptions, Open Graph text, and Twitter card metadata.

## Visual assets
- Generate a cohesive fashion campaign set featuring South Asian models plus distinct category/product imagery.
- Keep image references centralized so client photography can replace them later without changing page layouts.

## Validation
- Exercise search, filters, gallery switching, branch selection, cart quantity/removal, order validation, WhatsApp link generation, and confirmation end to end.
- Check desktop and mobile layouts for clipping, overlap, keyboard access, readable contrast, touch targets, and reduced-motion behavior.

## Technical notes
- Use the project’s TanStack file-based routing rather than React Router; it provides the requested true routes on this stack.
- The first version uses editable local catalog data and browser persistence. It does not claim live inventory, payment processing, real addresses, or a real WhatsApp number.
