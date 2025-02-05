import { MarketToolIcons } from "@/components/icons";

const toolsMenu = [
  {
    menu: "Cursors",
    tools: [
      {
        name: "Cross",
        icon: MarketToolIcons.CrossIcon,
      },
      {
        name: "Dot",
        icon: MarketToolIcons.DotIcon,
      },
      {
        name: "Arrow",
        icon: MarketToolIcons.CursorArrowIcon,
      },
      {
        name: "Eraser",
        icon: MarketToolIcons.EraserIcon,
      },
    ],
  },
  {
    manager: [
      {
        menu: "Lines",
        tools: [
          {
            name: "Trend Line",
            icon: MarketToolIcons.TrendLineIcon,
          },
          {
            name: "Ray",
            icon: MarketToolIcons.RayIcon,
          },
          {
            name: "Info Line",
            icon: MarketToolIcons.ExtendedLineIcon,
          },
          {
            name: "Extended Line",
            icon: MarketToolIcons.TrendAngleIcon,
          },
          {
            name: "Trend Angle",
            icon: MarketToolIcons.HorizontalLineIcon,
          },
          {
            name: "Horizontal Line",
            icon: MarketToolIcons.HorizontalRayIcon,
          },
          {
            name: "Vertical Line",
            icon: MarketToolIcons.VerticalLineIcon,
          },
          {
            name: "Cross Line",
            icon: MarketToolIcons.CrossLineIcon,
          },
        ],
      },
      {
        menu: "Channels",
        tools: [
          {
            name: "Parallel Channel",
            icon: MarketToolIcons.ParallelChannelIcon,
          },
          {
            name: "Flat Top/Bottom",
          },
          {
            name: "Disjoint Channel",
          },
        ],
      },
      {
        menu: "Pitchforks",
        tools: [
          {
            name: "Pitchfork",
          },
          {
            name: "Schiff Pitchfork",
          },
          {
            name: "Modified Schiff Pitchfork",
          },
          {
            name: "Inside Pitchfork",
          },
        ],
      },
    ],
  },
];
