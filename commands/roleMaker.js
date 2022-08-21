const { SlashCommandBuilder, Colors } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("baker")
    .setDescription("Makes a roll")
    .addStringOption((nameRoll) =>
      nameRoll
        .setName("name")
        .setDescription("The name of the role you want to bake")
        .setRequired(true)
    ),
  async execute(interaction) {
    const guild = interaction.member.guild;
    const nameRoll = interaction.options.getString("name");
    const interactionUser = interaction.member.user.username;
    try {
      const nyRoll = await guild.roles.create({
        name: nameRoll,
        color: "#" + ((Math.random() * 0xffffff) << 0).toString(16),
        reason: `Change made by ${interactionUser}`,
      });
      await interaction.reply(`The role ${nyRoll} was created`);
    } catch (error) {
      console.log(error);
      await interaction.reply(`I don't know what you did bub, but ${error}`);
    }
  },
};
