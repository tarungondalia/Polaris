# Bug Report Summary (with-bugs.practicesoftwaretesting.com)



## BUG-001: Homepage - Product Card - Image missing for Product " Slip Joint Pliers " & Few products Name alignment position right alignment instead of left align
Browser and Device: All

- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Observe the product grid on the homepage.
- **Expected:** Product cards render with names, images, prices and should align as expected or as per design
                Product name should align left on product card
- **Actual:** Product image is missing for product "Slip Joint Pliers", can see in BE response on product end point however FE fail to display - FE issue
- Few Product name alignment on left and few on right, which is not consistant 



## BUG-002: Logo - Site Logo "TOOLSHOP - DEMO" is missing
Browser and Device: All 
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. On the Shop page,

- **Expected:** Site logo should be visible 
- **Actual:** FSite Logo "TOOLSHOP - DEMO" is missing



## BUG-003: Product Card - ECO - Labels are missing on expected products and applied to unexpected products
Browser and Device: All 

- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Observe the product grid on the homepage.
- **Expected:** ECO - label applied to all products which have CO2 category "B" 
- **Actual:** ECO - label applied to all products which have CO2 category "D"

## BUG-004: Search - No-results message missing for non-matching searches
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Use the search bar with a non-existent term (e.g., `no-such-product-xyz`).
- **Expected:** A “There are no products found.” message should displayed.
- **Actual:** No message is shown.

## BUG-005: Header - Language selector is missing 
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Check header - next to Sign in 
- **Expected:** Language selector - dropdown menu should be visible 
- **Actual:** Language selector dropdown menu is missing

## BUG-006: Checkout - Missing information on Checkout steps
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Add a product to the cart and proceed to checkout.
  3. Attempt to checkout process step one
- **Expected:** - Continue shopping button shouls be on step one
                - Billing Address spelling should "Billing Address"
                - "Proceed to checkout" button name should be as expected
                - "Your Postcode *" place holder text should be there
- **Actual:** - Continue shopping button is missing 
              - Step 3- Billing address spelling mistak "Blliling Adress"
              - "Proceed to checkout" button name is missing
              - Your Postcode *" place holder text is missing
##BUG-007: Header - Menu - Contact spelling error
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Check header - Contakt
- **Expected:** Contact spelling should be "Contact" as it is defaulting to En language
- **Actual:** Contact spelling is Contakt

##BUG-008: Header - Categories - Category menu list name missing 
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Click on Categories
  3. Validate category list name in drop down menu
- **Expected:** All list should be named
- **Actual:** Third list name is "UNDEFINED"


##BUG-009: Homepage - Search - Search icon missing on homepage
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. Validate search icon
- **Expected:** Search icon with magnifying glass should be visible 
- **Actual:** Search icon is missing

##BUG-010: Login - Login Modal component missing and alignment issue
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
- **Expected:** Login moidal should be with "Google" sign in option and all component should align as expected 
- **Actual:** "Google" sign in option is missing and Label on both input field are missing (e.g. email & password)
              Email input field place holder text should be "Your email" and should be padding between text and input field boarder

##BUG-011: Registration - Modal component missing and alignment issue
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. click on Register your account link on modal
- **Expected:**  - Street label and input field should displyed, State and Country label should applied,
                - Password rules and Password strength progress bar should be displayed, all input field should have correct label, all place holder text should be as expected
- **Actual:**  - Street label and input field replaced by "Address' and "Your address"
              - State input has wrong label Country
              - Country dropdown has wrong lable State
              - Email input place holder text should be "Your email *"
              - Password rules missing 
              - Password strength progress bar is missing

##BUG-012: Forgot Password Modal - Email Input field should have placeholder text "Your email *"
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. click on Forgot Password link on modal
- **Expected:**  - Email input field should have a placeholder text "Your email *"
- **Actual:**  - Email input field have a placeholder text "Your E-mail *"

##BUG-013: Profile Page - Email Input field should have placeholder text "Your email *"
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Profile and navigate to "Profile" page
- **Expected:**  - Postcode label should be "Postal code"
                - New Password field should have a palceholder text "Your Password" and password visibility eye icon and password rule should be visible with progress bar
                - Confirm password field should have a place holder text "Your password" and password visibility eye icon and password rule should be visible with progress bar
                - Two-factor Authentication text and label should displayed
- **Actual:**  - "Postal code" displayed instead of "Postcode"
              - New Password field doesn't "Your Password" placeholder text and password visibility eye icon is missing and password rule with progress bar is missing
              - Confirm password field place holder text "Your password" is missing and password visibility eye icon is missing and password rulevwith progress bar is missing
              - Two-factor Authentication text and label are missing
              
##BUG-014:  Header Menu - Profile name on my account menu not visible
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Profile and navigate to "Profile" page
- **Expected:**  - On Top of my account customer First name and Last name should be disoplaed
- **Actual:**  -  On Top of my account customer First name and Last name not disoplaed
              

##BUG-015:  Header Menu - Home - Clicking on home navigate to Contact page
- **Steps to reproduce:**
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Profile and navigate to "Profile" page
  6. Click on "Home" from header menu
- **Expected:**  - Clicking on Home should navigate to homepage
- **Actual:**  -  Clicking on Home navigate to Contact page

##BUG-016:  Contact - Modal - First name, Last name & Email address field are missing on modal and additional sub header text visible
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Profile and navigate to "Profile" page
  6. Click on "Home" from header menu which open contact modal
- **Expected:**  - First name, Last name & Email address field should visible on modal and it should not have subheader text 
- **Actual:**  -  First name, Last name & Email address field are missing on modal and it should not have a subheader text "Hello Jane Doe, please fill out this form to submit your message."


##BUG-017:  Contact - Modal - Attachment - info text for attachment has wrong message or info
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Profile and navigate to "Profile" page
  6. Click on "Home" from header menu which open contact modal
- **Expected:**  - Info message on attachment should be "Only files with the txt extension are allowed, and files must be 0kb."
- **Actual:**  -Info message is "Only files with the txt, pdf or jpg extension are allowed, and files must be smaller than 500KB."

##BUG-018:  PDP - Add to cart button overlapped by Favourite button
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Product card and navigate to PDP
- **Expected:**  - "Add to cart" buttoin should be clearly visible
- **Actual:**  - "Add to cart" button overlapped by Favourite button

##BUG-019:  PDP - Add to cart notification shows error message in red instead success message in green
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Product card and navigate to PDP
  6. Click on "Add to cart"
- **Expected:**  - "Add to cart" Notification should be success and in green colour
- **Actual:**  - "Add to cart" notification is error and in red colour


##BUG-020:  Cart- Remove product from cart
  1. Go to `https://with-bugs.practicesoftwaretesting.com/`.
  2. click on Sign in button in header
  3. Enter email "customer@practicesoftwaretesting.com"
  4. Enter password "welcome01"
  5. Click on Product card and navigate to PDP
  6. Click on "Add to cart"
  7. Navigate to cart page
  8. Click on "X" icon/button to remove product from cart
- **Expected:**  - Product should be removed from cart
- **Actual:**  -  Product not removed from cart

## Buggy Site Defects (Screenshots)

- **Product list not rendering on homepage**  
  Product cards render with names, images, prices and should align as expected or as per design
  Product name should align left on product card 
  Screenshot: `reports/bug-screenshots/buggy-home-no-products.png`

- **No-results message missing in search**  
   A “There are no products found.” message should displayed.
  Screenshot: `reports/bug-screenshots/buggy-search-no-results.png`

