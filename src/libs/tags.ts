import { asyncForEach } from "./helpers";
import { Payload, File, FileType, Tag, Language } from "../types";
import { createPage } from "./page";
import { fileId } from "./files";

import { blockMid } from "cli-block";

/*
 *  Tags
 */

export const generateTags = async (payload: Payload): Promise<Payload> => {
  const tags: Tag[] = [];

  await asyncForEach(payload.files, (file: File) => {
    if (file.meta && file.meta?.tags) {
      for (let i = 0; i < file.meta.tags.length; i++) {
        const parent = payload.files.find((f) => f.name == file.parent);

        const tag = {
          name: file.meta.tags[i],
          parent: file.parent,
          type: parent?.meta.type || "",
        };
        if (
          !tags.some(
            (item) => item.name === tag.name && item.parent === tag.parent
          )
        )
          tags.push(tag);
      }
    }
  });
  return { ...payload, tags };
};

export const createTagPages = async (payload: Payload): Promise<Payload> => {
  if (payload.tags.length) blockMid("Tag pages");

  await asyncForEach(payload.tags, async (tag: Tag) => {
    const path = `/tag/${tag.parent}/${tag.name}/index.html`;

    const file: File = {
      id: fileId(path),
      name: tag.name,
      title: `#${tag.name}`,
      path,
      created: new Date(),
      language: Language.EN,
      fileName: "index.html",
      parent: tag.parent,
      meta: { type: tag.type },
      archives: [
        {
          name: tag.name,
          type: "",
          children: payload.files.filter(
            (file) =>
              file.meta?.tags?.includes(tag.name) && file.parent == tag.parent
          ),
        },
      ],
      html: `<h1>#${tag.name}</h1>`,
      type: FileType.TAG,
    };
    await createPage(payload, file);
  });
  return { ...payload };
};
