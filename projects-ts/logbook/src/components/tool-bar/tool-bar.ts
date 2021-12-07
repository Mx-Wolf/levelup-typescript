import { createHtmlElement, createHtmlFragment, createSvgRef, createText } from '../../views/parser.js';

export interface CommandProps {
  icon: string;
  label: string;
  enabled: boolean;
  onClick?: (() => void) | undefined;
  href?: string | undefined;
  className: string;
}
interface ToolbarProps {

  commands: CommandProps[]
}

const preventer = (evt:Event)=> evt.preventDefault();

const ensureOnClick = (element:HTMLElement, props: Pick<CommandProps, 'onClick'|'enabled'>)=>{
  const {onClick, enabled} = props;

  element.addEventListener(
    'click',
    typeof onClick === 'function' && enabled? onClick: preventer
  );

  return element;
};

export const createCommand = (command: CommandProps) => ensureOnClick(createHtmlElement(
  'a',
  {
    'class': command.className,
    'href': command.href||'#',
  },
  [
    createSvgRef({ height: 22, width: 22, href: `#${command.icon}` }),
    createHtmlElement('span', {}, [
      createText(command.label)
    ])
  ]
), command);

export const createToolbar = (props: ToolbarProps) => createHtmlFragment(
  props.commands.map(createCommand)
);
