/**
 * @file 协议
 */

/* global wx:false */
import React from "react";
import autoBind from "react-autobind";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import MobileTable from '@yrobot/react-mobile-table'
import '@yrobot/react-mobile-table/lib/index.css'
import "./agree.css";

class Agree extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  componentWillMount() { }

  componentDidMount() { }

  componentWillReceiveProps() { }

  componentWillUnmount() { }

  render() {
    if (window.orgCode == "mWZdPNwaKg") {
      return (
        <div className="page-introduce">
          <h5 className="page-introduce-subtitle page-introduce-take-up">隐私政策</h5>
          <div className="page-introduce-content">
            本政策仅适用于宝马（中国）汽车贸易有限公司（“宝马中国”或“我们”）的BMW企业志愿者线上管理平台。
            <br />
            最近更新日期：2021年04月。
            <br />
            如果您有任何疑问、意见或建议，请通过以下方式与我们联系：
            <br />
            电子邮件: servicecenter@bmw.com.cn
            <br />
            电话: 400-800-6666
            <br />

            本政策将帮助您了解以下内容：
            <br />
            1．我们的业务功能以及我们如何收集和使用您的个人信息
            <br />
            2．我们如何使用 Cookie 和同类技术
            <br />
            3．我们如何委托处理、共享、转让、公开披露您的个人信息
            <br />
            4．我们如何保护您的个人信息
            <br />
            5．您的权利
            <br />
            6．我们如何处理儿童的个人信息
            <br />
            7．您的个人信息如何在全球范围转移
            <br />
            8．本政策如何更新
            <br />
            9．如何联系我们
            <br />

            我们深知个人信息对您的重要性，秉承您对宝马产品的高期待值而严谨对待您的个人信息。客户个人信息的保密性和完整性是我们的重点关注领域。我们努力创造和维护与您的互信关系，为保护您的个人信息恪守以下原则：权责一致、目的明确、选择同意、最少必要、确保安全、主体参与、公开透明。同时，我们承诺按业界成熟的安全标准，采取相应的安全保护措施以充分保护您的个人信息。
            <br />
            <div className="page-introduce-black">
              请您在点击“同意”之前仔细阅读本隐私政策，确保对其内容的含义及相应法律后果已全部知晓并充分理解。您点击“同意”并确认提交即视为您接受本隐私政策，我们将按照相关法律法规及本政策合法使用和保护您的个人信息。
            </div>
            一、我们的业务功能以及我们如何收集和使用您的个人信息
            <br />
            个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，包括但不限于姓名、出生日期、身份证件号码、个人生物识别信息、地址、电话。
            <br />
            个人敏感信息是指一旦泄露、非法提供或滥用可能危及人身和财产安全，或极易导致个人名誉、身心健康受到损害或歧视性待遇等的个人信息。一般而言，个人身份证件号码、银行账号、精准定位信息等被视为个人敏感信息。在本政策中，有关个人敏感信息的条款将以加粗字体标注以提示您的特别注意。
            <br />
            我们仅会出于本政策所述的以下目的，为完成BMW企业志愿者线上管理平台的业务功能而收集和使用您的个人信息。
            <br />
            当我们需要将信息用于本政策未载明的其他用途时，会事先征求您的同意。
            <br/>
            除非在下述用途中另行明确，我们仅在实现相关用途所需的期间存储您的个人信息。如果信息被用于多种用途，一旦具体用途完成，您的信息将被自动删除或以不能直接或间接追溯到您的形式而存储。
            <br/>
            （一）缔结合同/用户注册
            <br/>
            为使用BMW企业志愿者线上管理平台和完成用户注册，我们将收集下述信息。
            <br/>
            1.必要的联系信息（身份证号、姓名、电子邮箱、手机号码、省份、城市、身份类型（宝马员工/经销商/车主/公众））
            <br/>
            2.账号信息（“BMW企业志愿者线上管理平台”账号登录信息）
            <br/>
            3.非必填信息（头像、微信定位）
            <br/>
            上述第1项信息是您正常使用BMW企业志愿者线上管理平台，为您提供基本业务功能所需的必要信息。如您不提供上述必要信息，您将无法正常使用BMW企业志愿者线上管理平台的基本业务服务。您的身份证号将仅用于志愿者活动的实名注册和活动中个人保险的购买。
            <br/>
            为充分享受BMW企业志愿者线上管理平台的有关服务，您需要注册BMW企业志愿者线上平台账号。为注册账号和使用账号，我们需要收集上述第2项信息，包括您的注册账号、口令。如您不提供上述信息，我们将无法为您创建账户名并为您提供相关服务。
            <br/>
            上述第3项列举的信息并非BMW企业志愿者线上管理平台完成注册的必要信息，但对改善服务质量、研发新产品或服务具有重要意义。您可以自主选择向我们提供或允许我们收集第3项列举的信息。我们不会强制要求您提供该等信息，您如拒绝提供将不影响您使用BMW企业志愿者线上管理平台基本产品或服务功能。在您使用我们服务期间，您持续授权我们使用您提供的上述信息。在您注销账号时，我们将停止使用并将及时删除上述信息（包括您使用该账号期间产生的个人信息）。但是，在法律法规和监管机构另有明确规定的情形下，与合同交易和金融交易有关的信息在合同到期或交易完成后仍将在法定时限内予以保存并有可能接受有关监管机构的检查。
            <br/>
            在您使用我们的业务功能时，我们的App会向您申请下列与个人信息相关的系统权限：微信定位、拍摄照片。
            <br/>
            上述共计2项系统权限。如果您不授权，将会导致我们无法提供该业务功能。除上述权限之外，您可自主选择是否额外授予App其他的系统权限。
            <br/>
            （二）确保质量与发展新产品
            <br/>
            在提供服务之外，上述第一部分涉及的信息还将被用于确保宝马产品和服务的质量以及发展新产品和服务。前述信息的使用与宝马致力于满足客户对现有产品和服务的高标准以及对未来新产品和服务的期许相关，因此属于宝马的合法利益。为保护客户隐私，上述信息将被特别处理以确保其不能直接或间接回溯到具体的客户，除非我们获得客户的单独授权同意。
            <br/>
            （三）服务和管理流程
            <br/>
            为持续优化志愿者公益活动体验，我们有可能基于合同信息编制分析报告，并有可能与经销商分享该等报告。该等分析旨在采取恰当措施(如：志愿者活动招募方式)以改进志愿者公益活动过程。我们将仅仅通过集合与匿名化形式准备该等报告。该等报告的接收者将无法根据报告所含信息将客户作为具体的自然人加以识别。
            <br/>
            （四）客户服务
            <br/>
            在处理与您有关的公益活动事项（如：参与由BMW发起的公益活动）或您提出的要求（如：您向宝马客服提交的查询或投诉），我们为联系到您本人而使用您的个人信息（如：姓名、电子邮件和电话号码）。我们在处理前述合同事项以及您的要求时，将根据您明确提供的联系方式（如：书面通信、电话、短信、电邮等）而联系您，并将不再单独征得您的同意。
            <br/>
            （五）履行法定义务
            <br/>
            我们要遵守一系列其他法定义务。为履行相关法定义务，我们在法律法规和监管要求的程度内使用您的信息，并在法定情形下向有关部门提供您的信息。另请参见本政策第三部分“我们如何委托处理、共享、转让、公开披露您的个人信息”。
            <br/>
            （六）征得收集、使用个人信息授权同意的例外情形
            <br/>
            根据相关法律法规及国家标准，在以下例外情形中，我们可能会依法收集并使用您的个人信息而无需征得您的授权同意：
            <br/>
            1.与我们履行法律法规规定的义务相关的；
            <br/>
            2.与国家安全、国防安全直接相关的；
            <br/>
            3.与公共安全、公共卫生、重大公共利益直接相关的；
            <br/>
            4.与刑事侦查、起诉、审判和判决执行等直接相关的；
            <br/>
            5.出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人授权同意的；
            <br/>
            6.所涉及的个人信息是您自行向社会公众公开的；
            <br/>
            7.根据您的要求签订和履行合同所必需的；
            <br/>
            8.从合法公开披露的信息中收集您的个人信息的，如合法的新闻报道、政府信息公开等渠道；
            <br/>
            9.维护所提供产品或服务的安全稳定运行所必需的，如发现、处置产品或服务的故障。
            <br/>
            二、我们如何使用 Cookie 和同类技术
            <br/>
            关于我们如何使用cookie和同类技术，请参见我们的Cookie政策，<a href="http://cookie.policy.volzdx.cn">http://cookie.policy.volzdx.cn。</a>
            <br />
            三、我们如何委托处理、共享、转让、公开披露您的个人信息
            <br/>
            （一）委托处理
            <br/>
            BMW企业志愿者线上管理平台服务中某些具体模块或功能由外部供应商提供。例如我们聘请服务提供商北京和众泽益管理咨询有限责任公司来协助我们提供客户支持。
            <br/>
            对我们委托处理个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求其根据我们的要求、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
            <br/>
            （二）共享
            <br/>
            1.与关联公司、经销商共享
            <br/>
            我们仅共享必要的个人信息，且受本隐私政策中所声明目的的约束。关联公司如要改变个人信息的处理目的，将再次征求您的授权同意。我们的关联公司包括：宝马股份公司（BMW AG）、劳斯莱斯汽车有限公司（Rolls-Royce Motor Cars Limited）、华晨宝马汽车有限公司、宝马汽车金融（中国）有限公司、宝马（中国）服务有限公司、先锋国际融资租赁有限公司、领悦数字信息技术有限公司，以及通过拥有表决权的股权、股份或以其他方式直接或间接由前述公司控制的、前述公司受其控制的或与前述公司受共同控制的任何公司或其他实体等。
            <br/>
            （2）与经销商共享。仅为实现本政策中声明的目的，我们会与经销商共享您的个人信息，以提供更好的客户服务和用户体验。
            <br/>
            对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的保密协定，要求其根据我们的说明、本隐私政策以及其他任何相关的保密和安全措施来处理个人信息。
            <br/>
            2.为保障本应用相关功能的实现与稳定运行，我们可能会接入由第三方提供的软件开发包（SDK）以实现相关目的。不同版本的第三方SDK会有所不同，一般包括地图导航类、推送通知消息类等。我们会对合作方获取信息获取信息的软件工具开发包（SDK）进行严格的安全监测，以保障数据安全。您可以通过下表查看第三方的数据使用和保护规则。
            <br/>
            <MobileTable
              data={[
                ['SDK', '功能', '所需权限', '收集的用户信息'],
                ['微信公众平台SDK', '获取用户微信授权', '存储权限', '个人微信头像、用户名'],
                ['腾讯地图SDK', '获取用户所在位置，地图导航', '定位权限，存储权限，读取设备信息', '个人位置信息'],
                ['容联云通讯SDK', '推送短信验证码', '', '手机号码'],
              ]}
            />
            <br/>
            3.我们可能会根据法律法规规定，或按监管机构的强制性要求，对外共享您的个人信息。
            <br/>
            4.除上述情形外，如因其他业务需要或合理事由需要对外共享您的个人信息，我们会向您告知共享个人信息的目的、数据接收方的类型等，并征得您的授权同意。
            <br/>
            （三）转让<br/>
            我们不会将您的个人信息转让给任何公司、组织和个人，但以下情形除外：<br/>
            1.在获取明确同意的条件下转让。获得您的明确同意后，我们会向其他方转让您的个人信息。<br/>
            2.在涉及合并、收购或破产清算时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受此隐私政策的约束，否则我们将要求该公司、组织重新向您征求授权同意。
            <br/>（四）公开披露<br/>
            我们仅会在以下情形下，公开披露您的个人信息：<br/>
            1.获得您明确同意后；<br/>
            2．基于法律的披露：在法律、法律程序、诉讼或政府主管部门强制性要求的情形下，我们可能会公开披露您的个人信息。
            <br/>（五）共享、转让、公开披露个人信息时事先征得授权同意的例外情形<br/>
            根据相关法律法规及国家标准，以下情形中，我们可能会共享、转让、公开披露您的个人信息而无需事先征得您的授权同意：
            <br/>1.与我们履行法律法规规定的义务相关的;<br/>
            2.与国家安全、国防安全直接相关的;<br/>
            3.与公共安全、公共卫生、重大公共利益直接相关的;<br/>
            4.与刑事侦查、起诉、审判和判决执行等直接相关的;<br/>
            5.出于维护您或其他个人的生命、财产等重大合法权益但又很难得到您本人授权同意的;<br/>
            6.您自行向社会公众公开的个人信息;<br/>
            7.从合法公开披露的信息中收集您的个人信息的，如合法的新闻报道、政府信息公开等渠道。<br/>

            四、我们如何保护您的个人信息<br/>
            （一）我们已使用符合业界标准的安全防护措施保护您提供的个人信息， 防止数据遭到未经授权访问、公开披露、使用、修改、损坏或丢失。我们会采取一切合理可行的措施，保护您的个人信息。例如，我们会使用加密技术确保数据的保密性；我们会使用受信赖的保护机制防止数据遭到恶意攻击；我们会部署访问控制机制，确保只有授权人员才可访问个人信息；以及我们会定期举办安全和隐私保护培训课程，加强员工对于保护个人信息重要性的认识。
            <br/>（二）我们会采取一切合理可行的措施，确保未收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非确有需要延长保留期并获得您的单独授权同意、或根据法律法规或监管有关数据保留期的特别要求。
            <br/>（三）互联网环境并非百分之百安全，我们将尽力确保您发送给我们的任何信息的安全性。如果我们的物理、技术、或管理防护设施遭到破坏，导致信息被非授权访问、公开披露、篡改、或毁坏而导致您的合法权益受损，我们将承担相应的法律责任。
            <br/>（四）在不幸发生个人信息安全事件后，我们将按照法律法规的要求，及时向您告知：安全事件的基本情况和可能的影响、我们已采取或将要采取的处置措施、您可自主防范和降低风险的建议、对您的补救措施等。我们将及时将事件相关情况以邮件、信函、电话、推送通知等方式告知您，难以逐一告知个人信息主体时，我们会采取合理、有效的方式发布公告。
            同时，我们还将按照监管机构要求，主动上报个人信息安全事件的处置情况。
            <br/>
            五、您的权利 <br/>
            按照中国相关的法律、法规、标准，以及其他国家、地区的通行做法， 我们保障您对自己的个人信息行使以下权利： <br/>
            （一）访问您的个人信息 <br/>
            您有权访问您的个人信息，法律法规规定的例外情形除外。如果您想行使数据访问权，可以通过以下方式自行访问： <br/>
            【H5首页->个人中心->个人资料，访问或编辑您的个人资料信息。】 <br/>
            如果您无法通过上述链接访问您的个人信息，您可以发送邮件至：servicecenter@bmw.com.cn或拨打电话400-800-6666。我们将在将在验证通过后不超过15个工作日内回复您的请求。 <br/>
            （二）更正您的个人信息 <br/>
            当您发现我们处理的关于您的个人信息有错误时，您有权要求我们做出更正。您可以发送邮件至：servicecenter@bmw.com.cn或拨打电话400-800-6666咨询具体更正流程。您也可以通过以下方式自行更正：
            <br/>【H5首页->个人中心->个人资料->修改资料】步骤，完善您的个人信息及申请信息。 <br/>
            如果您无法通过上述方式更正您的个人信息，您可以发送邮件至：servicecenter@bmw.com.cn或拨打电话400-800-6666。我们将在将在验证通过后不超过15个工作日内回复您的请求。
            <br/>（三）删除您的个人信息 <br/>
            在以下情形中，您可以向我们提出删除个人信息的请求： <br/>
            1．如果我们处理个人信息的行为违反法律法规； <br/>
            2．如果我们收集、使用您的个人信息，却未征得您的同意； <br/>
            3．如果我们处理个人信息的行为违反了与您的约定； <br/>
            4．如果您不再使用我们的产品或服务，或您注销了账号；（您可以选择【H5首页->个人中心->个人资料->需要帮助，联系客服删除您的相关信息）
            <br/>5．如果我们不再为您提供产品或服务。 <br/>
            若我们决定响应您的删除请求，我们还将同时通知从我们获得您的个人信息的实体，要求其及时删除，除非法律法规另有规定，或这些实体获得您的独立授权。
            <br/>当您从我们的服务中删除信息后，我们可能不会立即从备份系统中删除相应的信息，但会在备份更新时删除这些信息。
            <br/>（四）改变您授权同意的范围 <br/>
            <br/>每个业务功能需要一些基本的个人信息才能得以完成（见本政策第一部分）。对于额外收集的个人信息的收集和使用，您可以随时给予或收回您的授权同意。您可以通过以下方式自行操作：发送电子邮件至servicecenter@bmw.com.cn或拨打电话400-800-6666。
            <br/>当您收回同意后，我们将不再处理相应的个人信息。但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。
            <br/>（五）个人信息主体注销账户 <br/>
            您随时可发送邮件至servicecenter@bmw.com.cn或拨打电话400-800-6666注销此前注册的账户。 <br/>
            在注销账户之后，我们将停止为您提供产品或服务，并依据您的要求，删除您的个人信息，法律法规另有规定的除外。 <br/>
            （六）个人信息主体获取个人信息副本 <br/>
            您有权获取您的个人信息副本，您可以随时发送电子邮件至servicecenter@bmw.com.cn或拨打电话400-800-6666。 <br/>
            在技术可行的前提下，例如数据接口匹配，我们还可按您的要求，直接将您的个人信息副本传输给您指定的第三方。 <br/>
            （七）信息系统自动决策的使用 <br/>
            我们不会仅依据信息系统、算法等在内的非人工自动决策机制做出决定。 <br/>
            （八）响应您的上述请求 <br/>
            为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。
            <br/>我们将在15个工作日内做出答复。如您不满意，可以通过以下途径投诉:发送电子邮件至servicecenter@bmw.com.cn或拨打电话400-800-6666。
            <br/>对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情形收取一定成本费用。对于无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际（例如，涉及备份磁带上存放的信息）的请求，我们可能会予以拒绝。
            <br/>在以下情形中，我们将无法响应您的请求：
            <br/>1．与个人信息控制者履行法律法规规定的义务相关的；
            <br/>2．与国家安全、国防安全直接相关的；
            <br/>3．与公共安全、公共卫生、重大公共利益直接相关的；
            <br/>4．与犯罪侦查、起诉、审判和执行判决等直接相关的；
            <br/>5．个人信息控制者有充分证据表明个人信息主体存在主观恶意或滥用权利的；
            <br/>6．出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；
            <br/>7．响应个人信息主体的请求将导致个人信息主体或其他个人、组织的合法权益受到严重损害的；
            <br/>8．涉及商业秘密的。
            <br/>
            六、我们如何处理儿童的个人信息
            <br/>我们的产品、网站和服务主要面向成人。如果没有父母或监护人的同意，儿童不得创建自己的用户账户。
            <br/>对于经父母同意而收集儿童个人信息的情形，我们只会在受到法律允许、父母或监护人明确同意或者保护儿童所必要的情形下使用或公开披露此信息。
            <br/>尽管当地法律和习俗对儿童的定义不同，但我们将不满 14 周岁的任何人均视为儿童。
            <br/>如果我们发现自己在未事先获得可证实的父母同意的情形下收集了儿童的个人信息，则会设法尽快删除相关数据。

            <br/>七、您的个人信息如何在全球范围转移
            <br/>我们在中华人民共和国境内收集和产生的个人信息，将存储在中华人民共和国境内。因此，您的个人信息不会被转移到中国境外管辖区，或者受到来自中国境外管辖区的访问。

            <br/>八、本政策如何更新
            <br/>我们的隐私政策可能变更。未经您明确同意，我们不会削减您按照本隐私政策所应享有的权利。我们会在本页面上发布对本政策所做的任何变更。我们会将本政策的旧版本存档，供您查阅。
            <br/>对于重大变更，我们还会提供更为显著的通知（包括对于某些服务， 我们会通过电子邮件发送通知，说明隐私政策的具体变更内容）。
            <br/>本政策所指的重大变更包括但不限于：
            <br/>1．我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；
            <br/>2．我们在所有权结构、组织架构等方面发生重大变化。如业务调整、破产并购等引起的所有者变更等；
            <br/>3．个人信息共享、转让或公开披露的主要对象发生变化；
            <br/>4．您参与个人信息处理方面的权利及其行使方式发生重大变化；
            <br/>5．我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；
            <br/>6．个人信息安全影响评估报告表明存在高风险时。

            <br/>九、如何联系我们
            <br/>如果您对本隐私政策有任何疑问、意见或建议，请通过以下方式与我们联系：
            <br/>邮箱:  servicecenter@bmw.com.cn
            <br/>热线:  400-800-6666
            <br/>宝马（中国）汽车贸易有限公司，注册地址：中国北京市朝阳区东三环北路霞光里18号佳程广场B座28层，邮编：100027
            <br/>我们将尽力在15个工作日内回复您。如果您对我们的回复不满意，特别是如果我们的个人信息处理行为损害了您的合法权益，您可以咨询政府有关监管部门，寻求解决方案。
          </div>
        </div>
      )
    }
  }
}

Agree.title = "用户协议";
Agree.propTypes = {};

export default connect(
  state => state.my || {},
  dispatch => bindActionCreators({}, dispatch)
)(Agree);
