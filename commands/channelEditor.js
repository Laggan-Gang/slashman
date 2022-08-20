const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("doper")
    .setDescription("Change name of channel")
    .addChannelOption((option) =>
      option.setName("channel").setDescription("Select a channel")
    )
    .addStringOption((option) =>
      option.setName("name").setDescription("New channel name")
    ),
  async execute(interaction) {
    await interaction.reply("Done!");
  },
};
