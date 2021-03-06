/**
 * @file 协议
 */

/* global wx:false */
import React from 'react';
import autoBind from 'react-autobind';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './agree.css';

class Agree extends React.Component {

  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {
  }

  componentWillUnmount() {}

  render() {
    if( window.platformCode == 'joQeZJepZV'){
      return null
    }
    return (
      <div className="page-introduce">
        <h5 className="page-introduce-subtitle page-introduce-take-up">志多星软件用户使用协议</h5>


        <h5 className="page-introduce-title">导言</h5>
        <div className="page-introduce-content page-introduce-take-up">
          <div className="page-introduce-content">欢迎您使用志多星志愿服务管理平台软件（以下简称“本软件”）及服务！本软件由北京志多星科技有限公司开发（以下简称“志多星”）。</div>

          <div className="page-introduce-content">本软件在此特别提醒您（志愿者）在注册成为用户之前，请认真阅读本《用户协议》（以下简称“协议”），确保用户充分理解本协议中各条款。请您审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款并选择接受或不接受。除非您接受本协议所有条款，否则您无权注册、登录或使用本协议所涉服务。您的注册、登录、使用等行为将视为对本协议的接受，并同意接受本协议各项条款的约束。</div>

          <div className="page-introduce-content">如果您未满18周岁，请在法定监护人的陪同下阅读本协议及其他上述协议，并特别注意未成年人使用条款。</div>

          <div className="page-introduce-content">本协议约定本软件与用户之间关于本软件服务（以下简称“服务”）的权利义务。“用户”是指注册、登录、使用本服务的个人。本协议可由本软件随时更新，更新后的协议条款一旦公布即代替原来的协议条款。在本软件修改协议条款后，如果用户不接受修改后的条款，请立即停止使用本软件提供的服务，用户继续使用本软件提供的服务将被视为接受修改后的协议。</div>

        </div>
        <h5 className="page-introduce-title">一、账号注册</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、用户在使用本服务前需要注册一个本软件帐号。本软件帐号应当使用用户本人经实名认证的手机号码绑定注册，用户应使用尚未与本软件帐号绑定的手机号码，以及未被本软件根据本协议封禁的手机号码注册本软件帐号。本软件可以根据用户需求或产品需要对帐号注册和绑定的方式进行变更，而无须事先通知用户。</div>

          <div className="page-introduce-content">2、鉴于本软件帐号的绑定注册方式，用户同意本软件在注册时将使用用户提供的手机号码及/或自动提取用户的手机号码及自动提取用户的手机设备识别码等信息用于注册。</div>

          <div className="page-introduce-content">3、在用户注册及使用本服务时，本软件需要搜集能识别用户身份的个人信息以便本软件可以在必要时联系用户，或为用户提供更好的使用体验。本软件搜集的信息包括但不限于用户的姓名、性别、年龄、出生日期、地址；用户在使用本软件个别服务时，须提供其本人身份证信息，若填写的信息不完整，则无法使用本服务或在使用过程中受到限制。本软件同意对这些信息的使用将受限于第三条用户个人隐私信息保护的约束。</div>
          <div className="page-introduce-content">4、若用户为一个团体的，在注册时需要提供团体全体成员的身份信息，方得以以团队的形式进行注册。违反本条规定，以个人用户名义进行注册并参加的活动，由已注册的个人承担所有责任。且其他的团队成员无法享受本软件中的积分激励等奖励。</div>
        </div>
        <h5 className="page-introduce-title">二、软件服务</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、 服务的内容</div>

          <div className="page-introduce-content">1.1 本软件是免费提供志愿者注册及组织创建的管理功能平台，其注册资料的真实性、有效性由活动的发布方保证。本软件或志多星不承担任何保证责任。</div>

          <div className="page-introduce-content">1.2 本软件是免费提供活动发布、活动报名等功能的平台，活动的真实性、有效性由各上级主管部门审批。</div>

          <div className="page-introduce-content">2、 服务的形式</div>

          <div className="page-introduce-content">2.1 用户使用本服务需要下载本软件客户端软件或者通过其他平台链接到本软件，本软件给予用户一项个人的、不可转让及非排他性的许可。用户仅可为访问或使用本服务的目的而使用本软件及服务。</div>

          <div className="page-introduce-content">2.2 本服务中本软件客户端软件提供包括但不限于iOS、android等多个应用版本，用户必须选择与所安装手机相匹配的软件版本，或嵌入其他平台中如微信公众号、小程序等，用户可选择相应的平台进行使用。</div>

          <div className="page-introduce-content">3、 服务许可的范围</div>

          <div className="page-introduce-content">3.1 本软件给予用户一项个人的、不可转让及非排他性的许可，以使用本软件。用户可以为非商业目的在单一台终端设备上安装、使用、显示、运行本软件。</div>

          <div className="page-introduce-content">3.2. 本条及本协议其他条款未明示授权的其他一切权利仍由本软件保留，用户在行使这些权利时须另外取得本软件的书面许可。本软件如果未行使前述任何权利，并不构成对该权利的放弃。</div>

        </div>
        <h5 className="page-introduce-title">三、用户信息</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content"> 1、用户在注册账号或使用本服务的过程中，需要填写或提交必要的信息，如法律法规、规章规范性文件（以下称“法律法规”）规定的需要填写的身份信息。如用户提交的信息不完整或不符合法律法规的规定，则无法使用本服务或在使用本服务的过程中受到限制。</div>

          <div className="page-introduce-content">2、个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、身份证号、手机号码、手机设备识别码、IP地址、用户聊天记录。非个人隐私信息是指用户对本服务的操作状态以及使用习惯等明确且客观反映在本软件服务器端的基本记录信息、个人隐私信息范围外的其它普通信息，以及用户同意公开的上述隐私信息。</div>

          <div className="page-introduce-content">3、尊重用户个人隐私信息的私有性是本软件的一贯制度，本软件将采取合理的措施确保用户个人隐私信息安全，防止在本服务中收集的用户个人隐私信息泄露、毁损或丢失。在发生前述情形或者本软件发现存在发生前述情形的可能时，将及时采取补救措施。</div>

          <div className="page-introduce-content">4、用户理解并同意，为了更好的共享志愿服务平台，帮助用户积累志愿服务时间，本软件与中国志愿汇软件进行信息共享。除此之外，本软件未经用户同意不向任何第三方公开、透露用户个人隐私信息。但以下特定情形除外：</div>

          <div className="page-introduce-content">(1) 本软件根据法律法规规定或有权机关的指示提供用户的个人隐私信息；</div>

          <div className="page-introduce-content">(2) 由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的任何个人信息的泄漏，或其他非因本软件原因导致的个人隐私信息的泄露；</div>

          <div className="page-introduce-content">(3) 用户自行向第三方公开其个人隐私信息；</div>

          <div className="page-introduce-content">(4) 用户与本软件及合作单位之间就用户个人隐私信息的使用公开达成约定，本软件因此向合作单位公开用户个人隐私信息；</div>

          <div className="page-introduce-content">(5) 任何由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露。</div>

          <div className="page-introduce-content">5、用户同意本软件可在以下事项中使用用户的个人隐私信息：</div>

          <div className="page-introduce-content">(1) 本软件向用户及时发送重要通知，如软件更新、本协议条款的变更；</div>

          <div className="page-introduce-content">(2) 本软件内部进行审计、数据分析和研究等，以改进本软件的产品、服务和与用户之间的沟通；</div>

          <div className="page-introduce-content">(3) 依本协议约定，本软件管理、审查用户信息及进行处理措施；</div>

          <div className="page-introduce-content">(4) 适用法律法规规定的其他事项。</div>

          <div className="page-introduce-content">除上述事项外，如未取得用户事先同意，本软件不会将用户个人隐私信息使用于任何其他用途。</div>

          <div className="page-introduce-content">6、若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本协议和使用本服务。任何18岁以下的未成年人注册账号或使用本服务应事先取得家长或其法定监护人的书面同意。</div>

          <div className="page-introduce-content"> 7、本软件重视对未成年人个人隐私信息的保护。本软件将依赖用户提供的个人信息判断用户是否为未成年人。除根据法律法规的规定及有权机关的指示披露外，本软件不会使用或向任何第三方透露未成年人的聊天记录及其他个人隐私信息。除本协议约定的例外情形外，未经监护人事先同意，本软件不会使用或向任何第三方透露未成年人的个人隐私信息。</div>

          <div className="page-introduce-content">8、为了改善本软件的技术和服务，向用户提供更好的服务体验，本软件或可会自行收集使用或向第三方提供用户的非个人隐私信息。</div>

          <div className="page-introduce-content">9、一般情况下，用户可随时浏览、修改自己提交的信息，但出于安全性和身份识别（如号码申诉服务）的考虑，用户可能无法修改注册时提供的初始注册信息及其他验证信息。</div>

        </div>
        <h5 className="page-introduce-title">四、软件的安装与卸载</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、本软件为不同的终端设备开发了不同的软件版本，用户应当根据实际情况选择下载合适的版本进行安装或选择合适的平台进行使用。</div>

          <div className="page-introduce-content">2、下载安装程序后，用户需要按照该程序提示的步骤正确安装。</div>

          <div className="page-introduce-content">3、如果用户不再需要使用本软件或者需要安装新版软件，可以自行卸载。如果用户愿意帮助本软件改进产品服务，请告知卸载的原因。</div>

        </div>
        <h5 className="page-introduce-title">五、软件的更新</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content"> 1、为了改善用户体验、完善服务内容，本软件将不断努力开发新的服务，并为用户不时提供软件更新（这些更新可能会采取软件替换、修改、功能强化、版本升级等形式）。</div>

          <div className="page-introduce-content">2、为了保证本软件及服务的安全性和功能的一致性，本软件有权不经向用户特别通知而对软件进行更新，或者对软件的部分功能效果进行改变或限制。</div>

          <div className="page-introduce-content">3、 本软件新版本发布后，旧版本的软件可能无法使用。本软件不保证旧版本软件继续可用及相应的用户服务，请用户随时核对并下载最新版本。</div>

        </div>
        <h5 className="page-introduce-title">六、内容规范</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content"> 1、本条所述信息内容是指用户使用本软件及服务过程中所制作、复制、发布、传播的任何内容，包括但不限于账号头像、名字、用户说明等注册信息，或文字、语音、图片等发送、回复、活动现场图文和相关链接页面，以及其他使用账号或本服务所产生的内容。</div>

          <div className="page-introduce-content"> 2、本软件一直致力于为用户提供文明健康、规范有序的网络环境，用户不得利用本软件账号或本软件及服务制作、复制、发布、传播侵犯其他用户或第三方合法权益的内容，包括但不限于：</div>

          <div className="page-introduce-content"> 2.1 发布、传送、传播、储存违反国家法律法规禁止的内容：</div>

          <div className="page-introduce-content">（1）违反宪法确定的基本原则的；</div>

          <div className="page-introduce-content">（2）危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；</div>

          <div className="page-introduce-content">（3）损害国家荣誉和利益的；</div>

          <div className="page-introduce-content">（4）煽动民族仇恨、民族歧视，破坏民族团结的；</div>

          <div className="page-introduce-content">（5）破坏国家宗教政策，宣扬邪教和封建迷信的；</div>

          <div className="page-introduce-content">（6）散布谣言，扰乱社会秩序，破坏社会稳定的；</div>

          <div className="page-introduce-content">（7）散布淫秽、色情、赌博、暴力、恐怖或者教唆犯罪的；</div>

          <div className="page-introduce-content">（8）侮辱或者诽谤他人，侵害他人合法权益的；</div>

          <div className="page-introduce-content">（9）煽动非法集会、结社、游行、示威、聚众扰乱社会秩序；</div>

          <div className="page-introduce-content">（10）以非法民间组织名义活动的；</div>

          <div className="page-introduce-content">（11）不符合遵守法律法规、社会主义制度、国家利益、公民合法利益、公共秩序、社会道德风尚和信息真实性等“七条底线”要求的；</div>

          <div className="page-introduce-content">（12）含有法律、行政法规禁止的其他内容的。</div>

          <div className="page-introduce-content">2.2 发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</div>

          <div className="page-introduce-content">2.3 涉及他人隐私、个人信息或资料的。</div>

          <div className="page-introduce-content">2.4 发表、传送、传播骚扰、广告信息及垃圾信息或含有任何性或性暗示的。</div>

          <div className="page-introduce-content">2.5 其他违反法律法规、政策及公序良俗、社会公德或干扰本软件平台正常运营和侵犯其他用户或第三方合法权益内容的信息。</div>

          <div className="page-introduce-content">2.6 不得发布任何与本软件志愿服务目的不适之信息。</div>

        </div>
        <h5 className="page-introduce-title">七、使用规则</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、用户在本服务中或通过本服务所传送、发布的任何内容并不反映或代表，也不得被视为反映或代表本软件的观点、立场或政策，本软件对此不承担任何责任。</div>

          <div className="page-introduce-content"> 2、除非法律允许或本软件书面许可，用户使用本软件过程中不得从事下列行为：</div>

          <div className="page-introduce-content">2.1 删除本软件及其副本上关于著作权的信息；</div>

          <div className="page-introduce-content">2.2 对本软件进行反向工程、反向汇编、反向编译，或者以其他方式尝试发现本软件的源代码；</div>

          <div className="page-introduce-content"> 2.3 对本软件拥有知识产权的内容进行使用、出租、出借、复制、修改、链接、转载、汇编、发表、出版、建立镜像站点等；</div>

          <div className="page-introduce-content">2.4 对本软件或者本软件运行过程中释放到任何终端内存中的数据、软件运行过程中客户端与服务器端的交互数据，以及本软件运行所必需的系统数据，进行复制、修改、增加、删除、挂接运行或创作任何衍生作品，形式包括但不限于使用插件、外挂或本软件经授权的第三方工具/服务接入本软件和相关系统；</div>

          <div className="page-introduce-content">2.5 通过修改或伪造软件运行中的指令、数据，增加、删减、变动软件的功能或运行效果，或者将用于上述用途的软件、方法进行运营或向公众传播，无论这些行为是否为商业目的；</div>

          <div className="page-introduce-content"> 2.6 通过非本软件开发、授权的第三方软件、插件、外挂、系统，登录或使用本软件及服务，或制作、发布、传播上述工具；</div>

          <div className="page-introduce-content">2.7 自行或者授权他人、第三方软件对本软件及其组件、模块、数据进行干扰；</div>

          <div className="page-introduce-content"> 2.8 其他未经本软件明示授权的行为。</div>

          <div className="page-introduce-content"> 3、除非法律允许或本软件书面许可，用户使用本服务过程中不得从事下列行为：</div>

          <div className="page-introduce-content">3.1 提交、发布虚假信息，或冒充、利用他人名义的；</div>

          <div className="page-introduce-content"> 3.2 诱导其他用户点击链接页面或分享信息的；</div>

          <div className="page-introduce-content">3.3 虚构事实、隐瞒真相以误导、欺骗他人的；</div>

          <div className="page-introduce-content">3.4 侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；</div>

          <div className="page-introduce-content">3.5 未经本软件书面许可利用微信账号和任何功能，以及第三方运营平台进行推广或互相推广的；</div>

          <div className="page-introduce-content"> 3.6 利用本软件账号或本软件及服务从事任何违法犯罪活动的；</div>

          <div className="page-introduce-content">3.7 制作、发布与以上行为相关的方法、工具，或对此类方法、工具进行运营或传播，无论这些行为是否为商业目的；</div>

          <div className="page-introduce-content"> 3.8 其他违反法律法规规定、侵犯其他用户合法权益、干扰产品正常运营或本软件未明示授权的行为。</div>

          <div className="page-introduce-content">4、用户须对利用本软件账号或本服务传送信息的真实性、合法性、无害性、准确性、有效性等全权负责，与用户所传播的信息相关的任何法律责任由用户自行承担。如因此给本软件或第三方造成损害的，用户应当依法予以赔偿。用户应对本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。本软件无法且不会对因前述风险而导致的任何损失或损害承担责任。</div>

          <div className="page-introduce-content">5、本软件提供的服务中可能包括广告，用户同意在使用过程中显示本软件和第三方供应商、合作伙伴提供的广告。除法律法规明确规定外，用户应自行对依该广告信息进行的交易负责，对用户因依该广告信息进行的交易或前述广告商提供的内容而遭受的损失或损害，本软件不承担任何责任。</div>

        </div>
        <h5 className="page-introduce-title">八、账户管理</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、 用户在使用本服务前需要注册一个本软件账号。本软件账号可通过用户实名认证的手机号码进行注册。本软件有权根据用户需求或产品需要对账号注册和绑定的方式进行变更。</div>

          <div className="page-introduce-content">2、 本软件账号的所有权归本软件所有，用户完成申请注册手续后，仅获得本软件账号的使用权，且该使用权仅属于初始申请注册人，禁止赠与、借用、租用、转让或售卖本软件账号或者以其他方式许可非初始申请注册人使用本软件账号。非初始申请注册人不得通过受赠、继承、承租、受让或者其他任何方式使用本软件账号。</div>

          <div className="page-introduce-content">3、 用户有责任妥善保管注册账号信息及账号密码的安全，用户需要对注册账号以及密码下的行为承担法律责任。用户同意在任何情况下不向他人透露帐户及密码信息。当在用户怀疑他人在使用用户的账号时，用户应立即通知本软件。</div>

          <div className="page-introduce-content">4、 用户注册本软件账号后如果一年不登录该账号，本软件有权回收该账号，以免造成资源浪费，由此带来的任何损失均由用户自行承担。</div>

          <div className="page-introduce-content">5、用户应遵守本协议的各项条款，正确、适当地使用本服务，如因用户违反本协议中的任何条款，本软件在通知用户后有权依据协议中断或终止对违约用户本软件账号提供服务。同时，本软件保留在任何时候收回本软件账号、用户名的权利。</div>

        </div>
        <h5 className="page-introduce-title">九、数据储存</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content"> 1、本软件不对用户在本服务中相关数据的删除或储存失败负责。</div>

          <div className="page-introduce-content">2、本软件可以根据实际情况自行决定用户在本服务中数据的最长储存期限，并在服务器上为其分配数据最大存储空间等。用户可根据自己的需要自行备份本服务中的相关数据。</div>

          <div className="page-introduce-content">3、如用户停止使用本服务或本服务终止，本软件可以从服务器上永久地删除用户的数据。本服务停止、终止后，本软件没有义务向用户返还任何数据。</div>

        </div>
        <h5 className="page-introduce-title">十、用户注意事项及风险承担</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、用户理解并同意：本软件作为中立的网络平台，不对其他用户所发布的任何活动的真实性、准确性或安全性提供任何形式的担保。用户在使用本软件时，应当自行判断，自行承担所参与活动可能造成的后果。但本软件欢迎用户对本软件中的活动本身进行监督和举报。</div>

          <div className="page-introduce-content">2、 用户理解并同意：为了向用户提供有效的服务，本软件会利用用户移动通讯终端的处理器和带宽等资源。本软件使用过程中可能产生数据流量的费用，用户需自行向运营商了解相关资费信息，并自行承担相关费用。</div>

          <div className="page-introduce-content"> 3、 用户理解并同意：本软件的某些功能可能会让第三方知晓用户的信息，例如：其他志愿者可以通过排行榜、志愿者名单等等入口查看用户可公开的个人资料。</div>

          <div className="page-introduce-content">4、 用户在使用本软件某一特定服务时，该服务可能会另有单独的协议、相关业务规则等（以下统称为“单独协议”），用户在使用该项服务前请阅读并同意相关的单独协议。</div>

          <div className="page-introduce-content">5、 用户在使用本软件及服务时，须自行承担如下来自本软件不可掌控的风险内容，包括但不限于：</div>

          <div className="page-introduce-content">（1） 由于不可抗拒因素可能引起的个人信息丢失、泄漏等风险；</div>

          <div className="page-introduce-content">（2） 用户必须选择与所安装手机相匹配的软件版本，否则，由于软件与手机型号不相匹配所导致的任何问题或损害，均由用户自行承担；</div>

      （<div className="page-introduce-content">3） 用户在使用本软件访问第三方网站时，因第三方网站及相关内容所可能导致的风险，由用户自行承担；</div>

          <div className="page-introduce-content">（4） 用户发布的内容被他人转发、分享，因此等传播可能带来的风险和责任；</div>

          <div className="page-introduce-content">（5） 由于无线网络信号不稳定、无线网络带宽小等原因，所引起的本软件登录失败、资料同步不完整、页面打开速度慢等风险。</div>

          <div className="page-introduce-content">6、用户理解并同意，本软件仅为用户提供信息分享、传送及获取的平台，用户必须为自己注册账号下的一切行为负责，包括用户所传送的任何内容以及由此产生的任何后果。用户应对本软件及本服务中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的正确性、完整性或实用性的依赖而产生的风险。本软件无法且不会对因用户行为而导致的任何损失或损害承担责任。</div>

          <div className="page-introduce-content"> 如果用户发现任何人违反本协议约定或以其他不当的方式使用本服务，请立即向本软件举报或投诉，本软件将依本协议约定进行处理。</div>

          <div className="page-introduce-content">7、用户理解并同意，因业务发展需要，本软件保留单方面对本服务的全部或部分服务内容变更、暂停、终止或撤销的权利，用户需承担此风险。</div>

        </div>
        <h5 className="page-introduce-title">十一、知识产权声明</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、除本服务中涉及广告的知识产权由相应广告商享有外，本软件在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权均归本软件所有，但用户在使用本服务前对自己发布的内容已合法取得知识产权的除外。</div>

          <div className="page-introduce-content"> 2、除另有特别声明外，本软件提供本服务时所依托软件的著作权、专利权及其他知识产权均归本软件所有。</div>

          <div className="page-introduce-content"> 3、本软件在本服务中所涉及的图形、文字或其组成，以及其他本软件标志及产品、服务名称（以下统称“本软件标识”），其著作权或商标权归本软件所有。未经本软件事先书面同意，用户不得将本软件标识以任何方式展示或使用或作其他处理，也不得向他人表明用户有权展示、使用、或其他有权处理本软件标识的行为。</div>

          <div className="page-introduce-content">4、上述及其他任何本软件或相关广告商依法拥有的知识产权均受到法律保护，未经本软件或相关广告商书面许可，用户不得为任何商业或非商业目的自行或许可任何第三方实施、利用、转让上述知识产权。</div>

        </div>
        <h5 className="page-introduce-title">十二、积分使用规则</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、用户在提供的志愿服务时会得到一定的积分，用户可以登陆本软件自行兑换相应的礼物。</div>

          <div className="page-introduce-content">2、用户有任意以下行为，本软件有权采取积分锁定、积分清零等措施，并保留进一步追索的权利：</div>

          <div className="page-introduce-content">（1）违反本软件用户使用协议的；</div>

          <div className="page-introduce-content">（2）利用软件或系统漏洞进行虚假服务或其他骗取积分行为的；</div>

          <div className="page-introduce-content">（3）其他违反有关法律法规及规定的行为。</div>

          <div className="page-introduce-content"> 3、 积分有效期。用户自积分采集之日起，有效期为1年，当年产生的积分在下个自然年12月31日前有效，逾期将作废。</div>

          <div className="page-introduce-content">4、礼物兑换后，用户账户内会扣除相应的积分。积分兑换属回馈活动，不提供发票。若非质量问题，礼品一经兑换，不可撤消、退货、换货、退积分或兑换现金，不可变更。</div>

        </div>
        <h5 className="page-introduce-title">十三、法律责任</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、如果本软件发现或收到他人举报或投诉用户违反本协议约定的，本软件有权不经通知随时对相关内容，包括但不限于用户资料、聊天记录进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、账号封禁、设备封禁、功能封禁的处罚，且通知用户处理结果。</div>

          <div className="page-introduce-content"> 2、因违反用户协议被封禁的用户，可向本软件网站相关页面提交申诉，本软件将对申诉进行审查，并自行合理判断决定是否变更处罚措施。</div>

          <div className="page-introduce-content"> 3、用户理解并同意，本软件有权依合理判断对违反有关法律法规或本协议规定的行为进行处罚，对违法违规的任何用户采取适当的法律行动，并依据法律法规保存有关信息向有关部门报告等，用户应承担由此而产生的一切法律责任。</div>

          <div className="page-introduce-content"> 4、用户理解并同意，因用户违反本协议或相关服务条款的规定，导致或产生第三方主张的任何索赔、要求或损失，用户应当独立承担责任；本软件因此遭受损失的，用户也应当一并赔偿。</div>

        </div>
        <h5 className="page-introduce-title">十四、不可抗力及其他免责事由</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">1、用户理解并确认，在使用本服务的过程中，可能会遇到不可抗力等风险因素，使本服务发生中断。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。出现上述情况时，本软件将努力在第一时间与相关单位配合，及时进行修复，但是由此给用户或第三方造成的损失，本软件及合作单位在法律允许的范围内免责。</div>

          <div className="page-introduce-content">2、本服务同大多数互联网服务一样，受包括但不限于用户原因、网络服务质量、社会环境等因素的差异影响，可能受到各种安全问题的侵扰，如他人利用用户的资料，造成现实生活中的骚扰；用户下载安装的其他软件或访问的其他网站中可能含有病毒、木马程序或其他恶意程序，威胁到用户的计算机信息和数据的安全，继而影响本服务的正常使用等。用户应加强信息安全及使用者资料的保护意识，注意加强密码保护，以免遭致损失。</div>

          <div className="page-introduce-content">3、用户理解并确认，本服务存在因不可抗力、计算机病毒或黑客攻击、系统不稳定、用户所在位置、用户关机以及其他任何技术、互联网络、通信线路原因等造成的服务中断或不能满足用户要求的风险，因此导致的用户任何损失，本软件不承担任何责任。</div>

          <div className="page-introduce-content"> 4、用户理解并确认，在使用本服务过程中存在来自任何他人的包括误导性的、欺骗性的、威胁性的、诽谤性的、令人反感的或非法的信息，或侵犯他人权利的匿名或冒名的信息，以及伴随该等信息的行为，因此导致的用户的任何损失，本软件不承担任何责任。</div>

          <div className="page-introduce-content">5、用户理解并确认，本软件需要定期或不定期地对本软件平台或相关的设备进行检修或者维护，如因此类情况而造成服务在合理时间内的中断，本软件无需为此承担任何责任，但本软件应事先进行通告。</div>

          <div className="page-introduce-content">6、本软件依据法律法规、本协议约定获得处理违法违规或违约内容的权利，该权利不构成本软件的义务或承诺，本软件不能保证及时发现违法违规或违约行为或进行相应处理。</div>

          <div className="page-introduce-content">7、在任何情况下，本软件均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，承担责任（即使本软件已被告知该等损失的可能性亦然）。</div>

        </div>
        <h5 className="page-introduce-title">十五、服务的变更、中断、终止</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content"> 1、鉴于网络服务的特殊性，用户同意本软件有权随时变更、中断或终止部分或全部的服务。本软件变更、中断或终止的服务，本软件应当在变更、中断或终止之前通知用户。</div>

          <div className="page-introduce-content"> 2、如发生下列任何一种情形，本软件有权变更、中断或终止向用户提供的服务，而无需对用户或任何第三方承担任何责任：</div>

          <div className="page-introduce-content">(1) 根据法律规定用户应提交真实信息，而用户提供的个人资料不真实、或与注册时信息不一致又未能提供合理证明；</div>

          <div className="page-introduce-content"> (2) 用户违反相关法律法规或本协议的约定；</div>

          <div className="page-introduce-content"> (3) 按照法律规定或有权机关的要求；</div>

          <div className="page-introduce-content"> (4) 出于安全的原因或其他必要的情形。</div>

        </div>
        <h5 className="page-introduce-title">十六、第三方软件或技术</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content">  1、 本软件可能会使用第三方软件或技术（包括本软件可能使用的开源代码和公共领域代码等，下同），这种使用已经获得合法授权。</div>

          <div className="page-introduce-content"> 2、 本软件如果使用了第三方的软件或技术，本软件将按照相关法规或约定，对相关的协议或其他文件，可能通过本协议附件、在本软件安装包特定文件夹中打包、或通过开源软件页面等形式进行展示，它们可能会以“软件使用许可协议”、“授权协议”、“开源代码许可证”或其他形式来表达。前述通过各种形式展现的相关协议、其他文件及网页，均是本协议不可分割的组成部分，与本协议具有同等的法律效力，用户应当遵守这些要求。如果用户没有遵守这些要求，该第三方或者国家机关可能会对用户提起诉讼、罚款或采取其他制裁措施，并要求本软件给予协助，用户应当自行承担法律责任。</div>

          <div className="page-introduce-content"> 3、用户在使用本软件第三方提供的产品或服务时，除遵守本协议约定外，还应遵守第三方的用户协议。本软件和第三方对可能出现的纠纷在法律规定和约定的范围内各自承担责任。</div>

          <div className="page-introduce-content"> 4、因用户使用本软件或要求本软件提供特定服务时，本软件可能会调用第三方系统或者通过第三方支持用户的使用或访问，使用或访问的结果由该第三方提供（包括但不限于第三方通过本软件提供的服务，或通过开放平台接入的内容等），本软件不保证通过第三方提供服务及内容的安全性、准确性、有效性及其他不确定的风险，由此若引发的任何争议及损害，与本软件无关，本软件不承担任何责任。</div>

          <div className="page-introduce-content"> 5、如因本软件使用的第三方软件或技术引发的任何纠纷，应由该第三方负责解决，本软件不承担任何责任。本软件不对第三方软件或技术提供客服支持，若用户需要获取支持，请与第三方联系。</div>
        </div>

        <h5 className="page-introduce-title">十七、其他</h5>
        <div className="page-introduce-content page-introduce-take-up">

          <div className="page-introduce-content"> 1、本软件郑重提醒用户注意本协议中免除本软件责任和限制用户权利的条款，请用户仔细阅读，自主考虑风险。未成年人应在法定监护人的陪同下阅读本协议。</div>

          <div className="page-introduce-content"> 2、本协议的成立、生效、履行、解释及纠纷解决，适用于中华人民共和国法律。若用户和本软件之间发生任何纠纷或争议，首先应友好协商解决，协商不成的，用户同意将纠纷或争议提交北京市朝阳区人民法院管辖。</div>

          <div className="page-introduce-content"> 3、本协议的任何条款无论因何种原因无效或不具可执行性，其余条款仍有效，对双方具有约束力。</div>
        </div>
      </div>
    );
  }
}


if( window.platformCode == 'joQeZJepZV'){
  Agree.title = '长春志愿者用户协议';
}else{
  Agree.title = '志多星协议';
}
Agree.propTypes = {
};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch),
)(Agree);
