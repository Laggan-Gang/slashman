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
    const channel = interaction.options.getChannel("channel");
    const name = interaction.options.getString("name");
    console.log("prutt");
    await interaction.reply("Done!");
  },
};
