<template>
  <div class="s003">
    <div v-if="isLoading">
      <cube class="cube" :loading="true"></cube>
    </div>
    <div v-if="!isLoading">
      <h3>Details for {{ word }}</h3>
      <div class="cardbox">
        <span
          ><b>{{ word }}</b> is the <b>{{ wordInformation.frequency }}</b> most
          frequent term in our <b>{{ languageText }}</b> lexicon, which puts it
          at the top <b>{{ wordInformation.relativeRank }}</b>
          of the vocabulary that contains some
          <b>{{ wordInformation.vocabularySize }}</b> different terms.</span
        >
      </div>
      <router-link to="/">
        <button type="button" class="btn-new-search">Search New Word</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import LexiosService from '../services/LexiosService.js';
import allLanguages from '../shared/Languages.js';
export default {
  mounted() {
    LexiosService.getSimilarWords(this.language, this.word).then((response) => {
      this.isLoading = false;
      this.wordInformation = response.data.wordInformation;
    });
  },
  computed: {
    word() {
      return this.$route.params.word;
    },
    language() {
      return this.$route.params.language;
    },
    languageText() {
      return allLanguages[this.$route.params.language];
    },
  },
  data() {
    return {
      isLoading: true,
      wordInformation: '',
    };
  },
};
</script>

<style>
.cardbox {
  min-height: 5rem;
  padding: 1rem;
  max-width: 790px;
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  background: #fff;
}
.btn-new-search {
  margin-top: 1rem;
  padding: 1rem;
  height: 25%;
  width: 25%;
  min-width: 11rem;
  white-space: nowrap;
  color: #fff;
  border: 1;
  cursor: pointer;
  background: #63c76a;
}
</style>
