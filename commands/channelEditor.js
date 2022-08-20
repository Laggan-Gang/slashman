const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("doper")
    .setDescription("Change name of channel")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Select a channel")
    )
    .addStringOption("name")
    .setDescription("New name"),
  async execute(interaction) {
    await interaction.reply("Done!");
  },
};
