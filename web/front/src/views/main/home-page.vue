<template>
  <div class="home-top" :style="{ backgroundImage: `url(${currentImage.url})` }">
    <div class="content">
      <p class="title">{{ currentImage.title }}</p>
      <p class="desc author">By {{ currentImage.desc.author }}</p>
      <p class="desc time">{{ currentImage.desc.time }}</p>
    </div>
  </div>
  <div class="home-middle"></div>
  <div class="home-bottom"></div>
</template>

<script setup>
import { ref } from "vue";
import art_1 from "@/assets/images/art_1.jpg";
import art_2 from "@/assets/images/art_2.jpg";
import art_3 from "@/assets/images/art_3.jpg";
import art_4 from "@/assets/images/art_4.jpg";
import art_5 from "@/assets/images/art_5.jpg";
import art_6 from "@/assets/images/art_6.jpg";
const images = [
  {
    url: art_1,
    title: "Cliff Walk at Pourville",
    desc: { author: "Claude Monet", time: "1882" },
  },
  {
    url: art_2,
    title: "Spring by the Seine",
    desc: { author: "Claude Monet", time: "1875" },
  },
  {
    url: art_3,
    title: "Spring Landscape",
    desc: { author: "Charles-François Daubigny", time: "1862" },
  },
  {
    url: art_4,
    title: "The Cliff and the Porte Aval",
    desc: { author: "Claude Monet", time: "1885" },
  },
  {
    url: art_5,
    title: "Seascape near Les Saintes",
    desc: { author: "Vincent van Gogh", time: "1888" },
  },
  {
    url: art_6,
    title: "Spring frost",
    desc: { author: "Elioth Gruner", time: "1919" },
  },
];
const currentImage = ref(images[Math.floor(Math.random() * images.length)]);
</script>

<style lang="scss" scoped>
.home-top {
  position: relative;
  top: 0;
  z-index: 5;
  height: 100vh;
  width: 100%;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  .content {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;

    .title {
      font-size: 3rem;
      font-weight: 450;
      margin-bottom: 4rem;
    }
    .desc {
      font-size: 1.4rem;
      font-weight: 450;
    }
  }
}
.home-middle {
  height: 100vh;
}
</style>
