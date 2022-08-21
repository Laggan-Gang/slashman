const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("doper")
    .setDescription("Changes the name of a voice channel")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Select a channel to rename")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("name")
        .setDescription("New channel name")
        .setRequired(true)
    ),
  async execute(interaction) {
    const channel = interaction.options.getChannel("channel");
    const oldChannelName = channel.name;
    const newChannelName = interaction.options.getString("name");
    const interactionUser = interaction.member.user.username;
    if (channel.type === 2) {
      try {
        channel.edit({
          name: newChannelName,
          reason: "Channel edited by " + interactionUser,
        });
        interaction.reply(
          `Job's done, bub - I changed ${oldChannelName} to ${newChannelName}`
        );
      } catch (error) {
        console.log(error);
        interaction.reply("Something went wrong, bub " + error);
      }
    } else {
      console.log("Det är inte en voice channel");
      interaction.reply("Can't let you change the text channels, bub");
    }
  },
};
