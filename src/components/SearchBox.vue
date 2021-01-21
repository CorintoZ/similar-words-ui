<template>
  <div class="s003">
    <h2>Select a Language and write a word to search</h2>
    <form v-on:submit.prevent="handleSearch">
      <div class="inner-form">
        <div class="input-field first-wrap">
          <div class="input-select">
            <select class="choices" v-model="language">
              <option disabled value="">Select Language</option>
              <option
                v-for="(text, key) in languages"
                :key="key"
                v-bind:value="{ key, text }"
              >
                {{ text }}
              </option>
            </select>
          </div>
        </div>
        <div class="input-field second-wrap">
          <input
            v-model="word"
            id="search"
            type="text"
            placeholder="Enter a keyword"
          />
        </div>
        <div class="input-field third-wrap">
          <button class="btn-search" type="submit">
            <svg
              class="svg-inline--fa fa-search fa-w-16"
              aria-hidden="true"
              data-prefix="fas"
              data-icon="search"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </form>
    <div v-if="isLoading">
      <cube class="cube" :loading="true"> ></cube>
    </div>
    <div v-if="results" class="list">
      <div v-for="result in results" :key="result.strength">
        <router-link :to="`/${language.key}/${result.word}`">
          {{ result.word }}
          <b>{{ result.strength }}</b>
        </router-link>
      </div>
    </div>
    <div v-if="noResults">
      We are sorry, but we found no information for the term <b>{{ word }}</b
      >. But it might show up later on since we are continuosly learning
      <b>{{ language.text }}</b>
    </div>
  </div>
</template>

<script>
import LexiosService from '../services/LexiosService.js';
import allLanguages from '../shared/Languages';
export default {
  data() {
    return {
      languages: allLanguages,
      language: '',
      word: '',
      results: [],
      noResults: false,
      isLoading: false,
    };
  },
  methods: {
    handleSearch() {
      if (this.word && this.language) {
        this.results = [];
        this.noResults = false;
        this.isLoading = true;
        LexiosService.getSimilarWords(this.language.key, this.word)
          .then((res) => {
            this.isLoading = false;
            this.results = res.data.semanticallySimilarWords;
            if (!this.results.length) {
              this.noResults = true;
            }
          })
          .catch((err) => alert(err.message));
      }
    },
  },
};
</script>

<style>
.list {
  display: flex;
  max-width: 790px;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 1rem;
}
.list div {
  box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  border-radius: 3px;
  padding: 1rem;
  background: #fff;
  width: 32%;
  margin: 0.5rem 0;
}
.list div:hover {
  box-shadow: 0px 8px 20px 0px #63c76a;
}
.choices {
  padding: 10px 20px;
  opacity: 1;
  border-radius: 3px;
  color: #888;
  border: 0;
  height: 100%;
}
.choice:focus {
  outline: none !important;
}
.input-select {
  border: 0;
  border-radius: 3px;
  height: 100%;
}
.cube .cube1 {
  background-color: #e10d1d;
  color: #e10d1d;
}
.cube .cube2 {
  background-color: #e10d1d;
}
</style>
