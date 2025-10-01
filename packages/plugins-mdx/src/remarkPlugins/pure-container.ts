/**
 * 🚀 This plugin is used to support container directive in unified.
 * Taking into account the compatibility of the VuePress/Docusaurus container directive, current remark plugin in unified ecosystem only supports the following syntax:
 * ::: tip {title="foo"}
 * This is a tip
 * :::
 * But the following syntax is not supported:
 * ::: tip foo
 * This is a tip
 * :::
 * In fact, the syntax is usually used in SSG Frameworks, such as VuePress/Docusaurus.
 * So the plugin is used to solve the problem and support both syntaxes in above cases.
 */
/// <reference types="mdast-util-mdx-expression" />
import type {
  BlockContent,
  Literal,
  Paragraph,
  Parent,
  Root,
  RootContent,
} from 'mdast';
import type { ContainerDirective } from 'mdast-util-directive';
import type { Plugin } from 'unified';

export const DIRECTIVE_TYPES = [
  'tip',
  'note',
  'warning',
  'caution',
  'danger',
  'info',
] as const;
export type DirectiveType = (typeof DIRECTIVE_TYPES)[number];

/**
 * Transformer that removes title sections from container directives when no title is provided
 */
function transformer(tree: Parent) {
  let i = 0;
  try {
    while (i < tree.children.length) {
      const node: RootContent = tree.children[i];

      if ('children' in node) {
        transformer(node);
      }

      // containerDirective 节点示例
      // {
      //   "type": "containerDirective",
      //   "name": "tip",
      //   "data": {
      //     "hName": "div",
      //     "hProperties": {
      //       "class": "rspress-directive tip"
      //     }
      //   },
      //   "children": [
      //     {
      //       "type": "paragraph",
      //       "data": {
      //         "hName": "div",
      //         "hProperties": {
      //           "class": "rspress-directive-title"
      //         }
      //       },
      //       "children": [
      //         {
      //           "type": "text",
      //           "value": "TIP"
      //         }
      //       ]
      //     },
      //     {
      //       "type": "paragraph",
      //       "data": {
      //         "hName": "div",
      //         "hProperties": {
      //           "class": "rspress-directive-content"
      //         }
      //       },
      //       "children": [
      //         {
      //           "type": "paragraph",
      //           "children": [
      //             {
      //               "type": "text",
      //               "value": "\nThis is a tip"
      //             }
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // }

      if (node.type === 'containerDirective') {
        const type = node.name as DirectiveType;
        if (DIRECTIVE_TYPES.includes(type)) {
          // Find the title paragraph
          const titleIndex = node.children.findIndex(
            child =>
              child.type === 'paragraph' &&
              // @ts-ignore
              child.data?.hProperties?.class === 'rspress-directive-title',
          );

          // If there's no custom title (title is just the uppercase type)
          if (titleIndex !== -1) {
            const titleParagraph = node.children[titleIndex] as Paragraph;
            const titleText = (titleParagraph.children[0] as Literal)?.value;

            // If the title is just the uppercase type (meaning no custom title was provided)
            if (titleText === type.toUpperCase()) {
              // Remove the title paragraph
              node.children.splice(titleIndex, 1);
              // @ts-ignore
              if (node?.data?.hProperties?.class) {
                // @ts-ignore
                node.data.hProperties.class = `${node.data.hProperties.class} rspress-directive-pure`;
              }
            }
          }
        }
      }

      i++;
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export const remarkPureContainer: Plugin<[], Root> = () => {
  return transformer;
};
