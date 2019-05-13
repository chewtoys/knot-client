<template>
  <div
    class="p-5 text-grey-darkest leading-normal text-sm">
    <span
      class="post-body"
      v-html="body" />
    <ul
      v-if="links"
      class="list-reset mt-4">
      <li
        v-for="(link, i) in links"
        :key="i"
        class="px-3 py-2 bg-grey-lightest border border-grey-light rounded-sm mb-2">
        <a
          :href="link.url"
          target="_blank"
          class="text-grey-darkest no-underline">
          <LinkPreview
            v-slot="{ title, description, image }"
            :url="link.url">
            <h3 class="text-sm truncate">{{ title }}</h3>
            <p
              v-if="description"
              class="text-grey-dark text-xs mt-1 truncate">{{ description }}</p>
          </LinkPreview>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import MarkdownIt from 'markdown-it'
import LinkPreview from '~/components/post/LinkPreview'
export default {
  components: {
    LinkPreview
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    postTextWithMeta() {
      let text = this.post.postable.body
      const people = this.post.accompaniments
      if (this.post.location || people.length) {
        text += ' **—**'
      }
      if (people.length) {
        text += ' with '
        people.forEach((person, i) => {
          text += `**${person.user.first_name}**`
          if (people.length > 2 && i < people.length - 2) {
            text += ', '
          } else if (people.length >= 2 && i === people.length - 2) {
            text += ' and '
          }
        })
      }

      if (this.post.location) {
        text += ` at **${this.post.location.name}**`
      }

      return text
    },
    body() {
      if (this.md) {
        return this.md.render(this.postTextWithMeta)
      } else {
        return ''
      }
    },
    links() {
      if (this.md) {
        return this.md.linkify.match(this.post.postable.body)
      } else {
        return null
      }
    }
  },
  created() {
    this.md = new MarkdownIt({
      linkify: true,
      typographer: true
    })
    const defaultRender =
      this.md.renderer.rules.link_open ||
      function(tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }

    this.md.renderer.rules.link_open = function(
      tokens,
      idx,
      options,
      env,
      self
    ) {
      tokens[idx].attrPush(['target', '_blank'])
      tokens[idx].attrPush(['class', 'text-blue'])

      return defaultRender(tokens, idx, options, env, self)
    }
  }
}
</script>
