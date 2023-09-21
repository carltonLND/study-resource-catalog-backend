import { EmbedBuilder, WebhookClient } from "discord.js";
import { FullResource } from "..";

const webhookClient = new WebhookClient({
  // TODO: Make this an env variable
  url: "https://discord.com/api/webhooks/1153305879240781874/jPhyW2cs1Ksinm-pCHoBaWPynRFzqUMoej0niVJmc6OdXhRICZUNL4GbGl6oHKJrBald",
});

export function createResourceEmbed(resource: FullResource) {
  return new EmbedBuilder()
    .setTitle(`New Resource: ${resource.title}`)
    .setURL(
      `https://study-resource-catalog-c7c6.netlify.app/resource/${resource.id}`
    )
    .setDescription(resource.description)
    .setTimestamp(new Date(resource.created_at))
    .setFooter({ text: `Posted by: ${resource.owner.name}` });
}

export function sendNotification(...embeds: EmbedBuilder[]) {
  webhookClient.send({
    username: "Study Resource Catalog",
    embeds,
  });
}
