# diyastro.co.uk website

A static website: plain HTML, CSS and a little JavaScript. It needs no build step, database or PHP.
To preview it, open `index.html` in a browser.

## Structure

```
index.html                     Home
projects/index.html            Project list
projects/harmonic-mount/       Harmonic Drive Mount project
    index.html                 Overview and variant comparison
    mini.html, midi.html, maxi.html
    firmware.html              Controller firmware
    ascom.html                 ASCOM driver
gallery.html                   Photo gallery (filters and lightbox)
about.html                     About and contact
404.html                       "Page not found" page
css/style.css                  All styling (colours are set at the top)
js/main.js                     Mobile menu, night-vision mode, gallery lightbox
images/                        Logo, illustrations and gallery images
.htaccess                      Apache settings for IONOS (404 page, caching, HTTPS)
robots.txt, sitemap.xml        For search engines
```

## Deploying to IONOS

1. In the IONOS control panel, open **Hosting → SFTP & SSH** and create or note the SFTP user.
2. Connect with an SFTP client such as FileZilla or WinSCP: host `access-xxxxxxx.webspace-host.com`
   (shown in the panel), port 22.
3. Upload **the contents of this folder**, not the folder itself, to the web space directory
   that `diyastro.co.uk` points to. You can check this under **Domains & SSL → diyastro.co.uk → Usage**.
   Make sure the hidden `.htaccess` file is uploaded too. You don't need to upload `README.md`.
4. Once the SSL certificate is active, uncomment the HTTPS block in `.htaccess` and upload it again.

## "Coming soon" placeholder

`placeholder/` holds a holding page you can use until the full site is ready. It is one
`index.html` with the styling built in, plus an `images/` folder. To use it, upload the
**contents** of `placeholder/` to the web space root. When the full site is ready, delete
those files from the server and upload the main site instead. Don't upload the `placeholder`
folder alongside the full site.

## Common edits

* **Add a gallery photo:** put the image in `images/gallery/`, then copy a `<figure>` block in
  `gallery.html` and change the file name, caption and `data-category`.
* **Replace placeholder artwork:** the `.svg` images are generated illustrations. Replace them
  with real photos (`.jpg` or `.webp`, about 1600 px on the long side) and update each `src=""`.
* **Downloads:** each "Coming soon" entry in the download lists can become a link, for example
  `<a href="../../downloads/mini-drawings.pdf">Mini — drawings (PDF)</a>`.
* **Specifications:** the figures on the Mini, Midi and Maxi pages are design targets.
  Update them as the prototypes are measured.
* **Contact email:** `about.html` uses `info@diyastro.co.uk`. Create that mailbox in IONOS
  or change the address.
* **Header and footer:** these are repeated in every page. If you change a menu item, change it in all `.html` files.
