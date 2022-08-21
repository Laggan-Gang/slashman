const {
  SlashCommandBuilder,
  ActionRowBuilder,
  SelectMenuBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unroll")
    .setDescription("Removes a roll"),
  async execute(interaction) {
    const row = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("roleSelect")
        .setPlaceholder("Select the roll you want to remove")
        .addOptions({
          label: "Cancel",
          description: "Actually, no",
          value: "cancel",
        })
    );
    //one more like above because otherwise all channels won't fit
    const row2 = new ActionRowBuilder().addComponents(
      new SelectMenuBuilder()
        .setCustomId("roleSelect2")
        .setPlaceholder("Or maybe it's here...")
        .addOptions({
          label: "Cancel",
          description: "Actually, no",
          value: "cancel2",
        })
    );
    const roles = interaction.member._roles; //2 means voice channel
    let i = 0;
    for (const roll of roles) {
      const role = await interaction.guild.roles.fetch(roll);
      if (i <= 20) {
        row.components[0].addOptions([
          {
            label: `${role.name}`,
            value: `${role.id}`,
          },
        ]);
      } else {
        row2.components[0].addOptions([
          {
            label: `${role.name}`,
            value: `${role.id}`,
          },
        ]);
      }
      i++;
    }

    await interaction.reply({
      components: [row, row2],
    });
  },
};
