# Web Development Project 6 - *Food Explorer Dashboard*

Submitted by: **Kobe Jordan**

This web app: **provides a dashboard for exploring recipes from the Spoonacular API, allowing users to view recipe details, filter by diet type, and see statistics about the recipes.**

Time spent: **4** hours spent in total

## Required Features

The following **required** functionality is completed:

- [x] **Clicking on an item in the list view displays more details about it**
  - Clicking on a recipe in the dashboard list navigates to a detail view for that recipe
  - Detail view includes extra information about the recipe including summary, instructions, and dietary information
  - The same header is displayed in detail view as in dashboard view
  - *To ensure an accurate grade, your sidebar **must** be viewable when showing the details view in your recording.*
- [x] **Each detail view of an item has a direct, unique URL link to that item's detail view page**
  -  *To ensure an accurate grade, the URL/address bar of your web browser **must** be viewable in your recording.*
- [x] **The app includes at least two unique charts developed using the fetched data that tell an interesting story**
  - The dashboard includes statistics cards showing total recipes, average calories, and healthy recipes count
  - These statistics provide insights into the recipe dataset


The following **optional** features are implemented:

- [x] The site's customized dashboard contains more content that explains what is interesting about the data 
  - The dashboard includes statistics about the recipes and allows filtering by diet type
- [x] The site allows users to toggle between different data visualizations
  - Users can filter recipes by diet type using the dropdown menu

  
The following **additional** features are implemented:

* [x] Search functionality to find recipes by title
* [x] Detailed recipe information including cooking time, servings, and dietary tags
* [x] Responsive design for better user experience on different devices

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='./public/data-pt2.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

<!-- Replace this with whatever GIF tool you used! -->
GIF created with ... Kap
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

One of the main challenges encountered while building this app was working with the react router, I had trouble figuring out how to use the id of by recipes to then dynamicaly create routes.

## License

    Copyright [2025] [Kobe Jordan]

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.